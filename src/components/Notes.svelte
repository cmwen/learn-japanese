<script>
  import { t } from '../lib/i18n';
  import { notes } from '../lib/stores';
  import { v4 as uuidv4 } from 'uuid';

  let showEditor = false;
  let currentNote = null; // { id, title, content, date, tags }
  let noteTitle = '';
  let noteContent = '';
  let noteTags = '';
  let searchQuery = '';
  let selectedTag = '';

  function newNote() {
    currentNote = null;
    noteTitle = '';
    noteContent = '';
    noteTags = '';
    showEditor = true;
  }

  function editNote(note) {
    currentNote = note;
    noteTitle = note.title;
    noteContent = note.content;
    noteTags = note.tags ? note.tags.join(', ') : '';
    showEditor = true;
  }

  function saveNote() {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert($t('note_empty_warning'));
      return;
    }

    const now = new Date();
    const tags = noteTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    const newOrUpdatedNote = {
      id: currentNote ? currentNote.id : uuidv4(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
      tags: tags,
      date: now.toISOString()
    };

    notes.update(currentNotes => {
      if (currentNote) {
        // Update existing note
        return currentNotes.map(n => (n.id === newOrUpdatedNote.id ? newOrUpdatedNote : n));
      } else {
        // Add new note
        return [...currentNotes, newOrUpdatedNote];
      }
    });

    showEditor = false;
    currentNote = null;
    noteTitle = '';
    noteContent = '';
    noteTags = '';
  }

  function deleteNote(id) {
    if (confirm($t('confirm_delete_note'))) {
      notes.update(currentNotes => currentNotes.filter(n => n.id !== id));
    }
  }

  function cancelEdit() {
    showEditor = false;
    currentNote = null;
    noteTitle = '';
    noteContent = '';
    noteTags = '';
  }

  function clearSearch() {
    searchQuery = '';
  }

  function clearTagFilter() {
    selectedTag = '';
  }

  function exportAllNotes() {
    const allNotes = $notes;
    const jsonString = JSON.stringify(allNotes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'kanjigo_notes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(t('notes_export_started'));
  }

  // Sort notes by date, newest first
  $: sortedNotes = Array.isArray($notes) ? $notes.sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
  
  // Get all unique tags
  $: allTags = [...new Set(sortedNotes.flatMap(note => note.tags || []))].sort();
  
  // Filter notes based on search query and selected tag
  $: filteredNotes = sortedNotes.filter(note => {
    const matchesSearch = !searchQuery.trim() || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesTag = !selectedTag || (note.tags && note.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });
</script>

<div class="notes-container">
  {#if showEditor}
    <div class="note-editor">
      <h3>{currentNote ? $t('edit_note') : $t('new_note')}</h3>
      <input type="text" bind:value={noteTitle} placeholder={$t('note_title_placeholder')} />
      <textarea bind:value={noteContent} placeholder={$t('note_content_placeholder')}></textarea>
      <input type="text" bind:value={noteTags} placeholder={$t('tags_label')} class="tags-input" />
      <div class="editor-actions">
        <button on:click={saveNote}>{$t('save_note')}</button>
        <button on:click={cancelEdit} class="cancel-button">{$t('cancel')}</button>
      </div>
    </div>
  {:else}
    <div class="notes-list-header">
      <button on:click={newNote}>{$t('new_note')}</button>
      <button on:click={exportAllNotes} disabled={!$notes.length}>{$t('export_all_notes')}</button>
    </div>

    <!-- Search and filter functionality -->
    {#if sortedNotes.length > 0}
      <div class="search-filter-container">
        <div class="search-container">
          <input 
            type="text" 
            bind:value={searchQuery} 
            placeholder={$t('search_notes')}
            class="search-input"
            aria-label={$t('search_notes')}
          />
          {#if searchQuery.trim()}
            <button 
              on:click={clearSearch}
              class="clear-search-button"
              aria-label={$t('clear_search')}
            >
              ×
            </button>
          {/if}
        </div>
        
        {#if allTags.length > 0}
          <div class="tag-filter-container">
            <select bind:value={selectedTag} class="tag-filter" aria-label={$t('filter_by_tag')}>
              <option value="">{$t('all_tags')}</option>
              {#each allTags as tag}
                <option value={tag}>{tag}</option>
              {/each}
            </select>
            {#if selectedTag}
              <button 
                on:click={clearTagFilter}
                class="clear-tag-button"
                aria-label="Clear tag filter"
              >
                ×
              </button>
            {/if}
          </div>
        {/if}
      </div>
    {/if}

    {#if filteredNotes.length > 0}
      <ul class="notes-list">
        {#each filteredNotes as note (note.id)}
          <li class="note-item">
            <div class="note-info">
              <h4>{note.title}</h4>
              <p class="note-date">{new Date(note.date).toLocaleDateString()}</p>
              {#if note.tags && note.tags.length > 0}
                <div class="note-tags">
                  {#each note.tags as tag}
                    <button 
                      class="tag-badge" 
                      on:click={() => selectedTag = tag} 
                      aria-label="Filter by tag: {tag}"
                    >
                      {tag}
                    </button>
                  {/each}
                </div>
              {/if}
              <p class="note-snippet">{note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
            </div>
            <div class="note-actions">
              <button on:click={() => editNote(note)}>{$t('edit')}</button>
              <button on:click={() => deleteNote(note.id)} class="delete-button">{$t('delete')}</button>
            </div>
          </li>
        {/each}
      </ul>
    {:else if searchQuery.trim() && sortedNotes.length > 0}
      <p class="no-results-message">{$t('no_search_results')}</p>
    {:else if sortedNotes.length === 0}
      <p class="no-notes-message">{$t('no_notes_yet')}</p>
    {/if}
  {/if}
</div>

<style>
  .notes-container {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--card-background);
  }

  .notes-list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .search-container {
    position: relative;
    flex: 1;
    margin-right: 10px;
  }

  .search-filter-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  .tag-filter-container {
    position: relative;
    min-width: 150px;
  }

  .tag-filter {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--background-color-secondary);
    color: var(--text-color);
    font-size: 1em;
  }

  .clear-tag-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 18px;
    color: var(--text-color-secondary);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 3px;
    line-height: 1;
    pointer-events: auto;
  }

  .clear-tag-button:hover {
    background-color: var(--border-color);
    color: var(--text-color);
  }

  @media (max-width: 600px) {
    .search-filter-container {
      flex-direction: column;
    }
    
    .search-container {
      margin-right: 0;
    }
  }

  .search-input {
    width: 100%;
    padding: 12px 40px 12px 12px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--background-color-secondary);
    color: var(--text-color);
    font-size: 1em;
    box-sizing: border-box;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb), 0.1);
  }

  .clear-search-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 18px;
    color: var(--text-color-secondary);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 3px;
    line-height: 1;
  }

  .clear-search-button:hover {
    background-color: var(--border-color);
    color: var(--text-color);
  }

  .note-editor {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .note-editor input[type="text"],
  .note-editor textarea {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--background-color-secondary);
    color: var(--text-color);
    font-size: 1em;
  }

  .tags-input {
    font-size: 0.9em;
    color: var(--text-color-secondary);
  }

  .tags-input::placeholder {
    color: var(--text-color-tertiary);
    font-style: italic;
  }

  .note-editor textarea {
    min-height: 150px;
    resize: vertical;
  }

  .editor-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .notes-list {
    list-style: none;
    padding: 0;
  }

  .note-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    background-color: var(--background-color-primary);
  }

  .note-info {
    flex-grow: 1;
    text-align: left;
  }

  .note-info h4 {
    margin: 0 0 5px 0;
    color: var(--text-color-primary);
  }

  .note-date {
    font-size: 0.8em;
    color: var(--text-color-secondary);
    margin-bottom: 10px;
  }

  .note-tags {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .tag-badge {
    background-color: var(--accent-color);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75em;
    cursor: pointer;
    transition: opacity 0.2s ease;
    border: none;
    font-family: inherit;
  }

  .tag-badge:hover {
    opacity: 0.8;
  }

  .tag-badge:focus {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }

  .note-snippet {
    font-size: 0.9em;
    color: var(--text-color-secondary);
  }

  .note-actions button {
    margin-left: 10px;
    padding: 8px 12px;
    font-size: 0.9em;
  }

  .delete-button {
    background-color: #f44336;
  }

  .delete-button:hover {
    background-color: #d32f2f;
  }

  .cancel-button {
    background-color: #6c757d;
  }

  .cancel-button:hover {
    background-color: #5a6268;
  }

  .no-notes-message {
    text-align: center;
    color: var(--text-color-secondary);
    margin-top: 30px;
  }

  .no-results-message {
    text-align: center;
    color: var(--text-color-secondary);
    margin-top: 30px;
    font-style: italic;
  }
</style>
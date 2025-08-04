<script>
  import { t } from '../lib/i18n';
  import { notes } from '../lib/stores';
  import { v4 as uuidv4 } from 'uuid';

  let showEditor = false;
  let currentNote = null; // { id, title, content, date }
  let noteTitle = '';
  let noteContent = '';

  function newNote() {
    currentNote = null;
    noteTitle = '';
    noteContent = '';
    showEditor = true;
  }

  function editNote(note) {
    currentNote = note;
    noteTitle = note.title;
    noteContent = note.content;
    showEditor = true;
  }

  function saveNote() {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert($t('note_empty_warning'));
      return;
    }

    const now = new Date();
    const newOrUpdatedNote = {
      id: currentNote ? currentNote.id : uuidv4(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
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
</script>

<div class="notes-container">
  {#if showEditor}
    <div class="note-editor">
      <h3>{currentNote ? $t('edit_note') : $t('new_note')}</h3>
      <input type="text" bind:value={noteTitle} placeholder={$t('note_title_placeholder')} />
      <textarea bind:value={noteContent} placeholder={$t('note_content_placeholder')}></textarea>
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

    {#if sortedNotes.length > 0}
      <ul class="notes-list">
        {#each sortedNotes as note (note.id)}
          <li class="note-item">
            <div class="note-info">
              <h4>{note.title}</h4>
              <p class="note-date">{new Date(note.date).toLocaleDateString()}</p>
              <p class="note-snippet">{note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
            </div>
            <div class="note-actions">
              <button on:click={() => editNote(note)}>{$t('edit')}</button>
              <button on:click={() => deleteNote(note.id)} class="delete-button">{$t('delete')}</button>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
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
</style>
export const inputMethodGuides = [
  {
    id: 'windows_ime',
    os: 'Windows',
    title: 'Setting up Japanese IME on Windows',
    content: `
## Setting up Japanese IME on Windows

1.  **Open Language Settings:** Go to Start > Settings > Time & Language > Language.
2.  **Add a Language:** Click "Add a language" and search for "Japanese". Select it and click "Next".
3.  **Install Language Pack:** Ensure "Language pack" and "Basic typing" are checked. You can also choose to install "Speech" and "Handwriting" if desired. Click "Install".
4.  **Set as Default (Optional):** Once installed, you can set Japanese as your default display language if you wish, but it's not necessary for typing.
5.  **Switching Input Methods:** In your taskbar, you'll see an indicator for your current input method (e.g., "ENG" for English). Click it and select "Japanese Microsoft IME".
6.  **Toggle Input Mode:** Once Japanese IME is selected, click the "A" or "あ" icon in the taskbar to toggle between Alphanumeric (A) and Hiragana (あ) input modes. You can also use the **Alt + ~** (tilde) shortcut.
7.  **Typing in Hiragana:** With Hiragana mode active, type phonetically (e.g., "nihon" for にほん). Press Spacebar to convert to Kanji or Katakana, then Enter to confirm.
8.  **Typing in Katakana:** To type in Katakana, switch to Hiragana mode, type the word, and then press **F7** to convert it to full-width Katakana.
9.  **Direct Hiragana/Katakana:** You can also right-click the IME icon in the taskbar and select "Hiragana" or "Full-width Katakana" directly.

### Troubleshooting

*   **IME not appearing:** Ensure the language pack is fully installed. Restart your computer if necessary.
*   **Cannot type Japanese characters:** Check that the input mode is set to Hiragana (あ) and not Alphanumeric (A).
*   **Accidental conversions:** Press Esc to cancel a conversion before confirming with Enter.
`,
    keywords: ['Windows', 'IME', 'Japanese input', 'setup']
  },
  {
    id: 'macos_ime',
    os: 'macOS',
    title: 'Setting up Japanese IME on macOS',
    content: `
## Setting up Japanese IME on macOS

1.  **Open Keyboard Settings:** Go to System Settings (or System Preferences) > Keyboard.
2.  **Input Sources:** Click on "Input Sources" (or "Input Methods" depending on macOS version).
3.  **Add Japanese:** Click the "+" button, search for "Japanese", and select "Japanese" (or "Japanese - Kana" and "Japanese - Romaji" if available, though usually just "Japanese" is sufficient). Click "Add".
4.  **Switching Input Methods:** In the menu bar at the top right of your screen, you'll see a flag icon or a character icon (e.g., "A" or "あ"). Click it and select "Japanese".
5.  **Toggle Input Mode:** Once Japanese is selected, you can switch between input modes (Hiragana, Katakana, Romaji) from the same menu bar icon, or use the **Control + Shift + ;** shortcut to cycle through them.
6.  **Typing in Hiragana:** With Hiragana mode active, type phonetically (e.g., "konnichiwa" for こんにちは). Press Spacebar to convert to Kanji or Katakana, then Enter to confirm.
7.  **Typing in Katakana:** To type in Katakana, switch to Hiragana mode, type the word, and then press **Shift + Caps Lock** or **Control + K** to convert it to Katakana.

### Troubleshooting

*   **Input source not appearing:** Ensure you've added the Japanese input source correctly in Keyboard settings.
*   **Shortcuts not working:** Check for conflicting keyboard shortcuts in System Settings > Keyboard > Keyboard Shortcuts.
*   **Unexpected conversions:** Press Esc to revert to the phonetic input before confirming.
`,
    keywords: ['macOS', 'IME', 'Japanese input', 'setup']
  },
  {
    id: 'ios_keyboard',
    os: 'iOS',
    title: 'Adding Japanese Keyboard on iOS',
    content: `
## Adding Japanese Keyboard on iOS

1.  **Open Settings:** Go to Settings > General > Keyboard > Keyboards.
2.  **Add New Keyboard:** Tap "Add New Keyboard...".
3.  **Select Japanese:** Scroll down and select "Japanese".
4.  **Choose Keyboard Layout:** You'll typically have options like "Romaji" (typing romanized Japanese) and "Kana" (typing directly with a kana layout). "Romaji" is usually recommended for most users. Select your preferred layout and tap "Done".
5.  **Switching Keyboards:** When typing in any app, tap the globe icon (🌐) on the keyboard to cycle through your enabled keyboards until you reach the Japanese keyboard.
6.  **Typing in Romaji (if selected):** Type romanized Japanese (e.g., "arigato"). The keyboard will automatically suggest Hiragana, Katakana, and Kanji conversions. Tap the desired suggestion.
7.  **Typing in Kana (if selected):** Tap the kana characters directly on the keyboard. Swipe up on a character to access small characters (e.g., っ, ゃ).

### Troubleshooting

*   **Keyboard not appearing:** Ensure the Japanese keyboard is enabled in Settings > General > Keyboard > Keyboards.
*   **Suggestions not appearing:** Make sure you are typing phonetically in Romaji mode, or correctly tapping kana in Kana mode.
`,
    keywords: ['iOS', 'iPhone', 'iPad', 'Japanese keyboard', 'setup']
  }
];

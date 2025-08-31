export const inputMethodGuides = [
  {
    id: 'windows',
    title: 'Windows',
    description: 'Set up Japanese input on Windows 10/11',
    steps: [
      {
        title: 'Add Japanese Language',
        description: 'Go to Settings > Time & Language > Language & region',
        details: [
          'Click "Add a language"',
          'Search for "Japanese" and select it',
          'Click "Next" and then "Install"',
          'Wait for the language pack to download'
        ]
      },
      {
        title: 'Enable Japanese IME',
        description: 'Configure the Japanese Input Method Editor',
        details: [
          'Click on the language indicator in the taskbar (usually shows "ENG")',
          'Select "Japanese" from the list',
          'You should see "JP" in the taskbar when Japanese is active'
        ]
      },
      {
        title: 'Switch Input Modes',
        description: 'Toggle between different input modes',
        details: [
          'Press Alt + Shift to switch between languages',
          'Press Alt + ` (backtick) to toggle hiragana/katakana/alphanumeric',
          'Use the IME toolbar for additional options'
        ]
      }
    ],
    troubleshooting: [
      {
        problem: 'Japanese language not appearing in options',
        solution: 'Make sure Windows is updated to the latest version and try restarting your computer.'
      },
      {
        problem: 'Cannot type in Japanese after setup',
        solution: 'Check that the JP indicator is showing in the taskbar. Press Alt + Shift to switch languages.'
      }
    ]
  },
  {
    id: 'macos',
    title: 'macOS',
    description: 'Set up Japanese input on macOS',
    steps: [
      {
        title: 'Add Japanese Input Source',
        description: 'Add Japanese to your input sources',
        details: [
          'Open System Preferences (or System Settings on macOS 13+)',
          'Go to Keyboard > Input Sources',
          'Click the "+" button to add a new input source',
          'Select "Japanese" and choose "Hiragana" or "Romaji"',
          'Click "Add"'
        ]
      },
      {
        title: 'Switch Input Methods',
        description: 'Toggle between input methods',
        details: [
          'Use Cmd + Space to switch between input sources',
          'Or click the input menu in the menu bar',
          'Select the desired input method from the dropdown'
        ]
      },
      {
        title: 'Customize Shortcuts',
        description: 'Set up convenient keyboard shortcuts',
        details: [
          'In Keyboard settings, go to "Shortcuts"',
          'Select "Input Sources" from the sidebar',
          'Customize shortcuts for switching input sources',
          'Consider enabling "Use the Caps Lock key to switch to and from ABC"'
        ]
      }
    ],
    troubleshooting: [
      {
        problem: 'Japanese input not working in some apps',
        solution: 'Some apps may need to be restarted after adding the input source. Try closing and reopening the app.'
      },
      {
        problem: 'Predictive text not showing',
        solution: 'Make sure "Live conversion" is enabled in the Japanese input preferences.'
      }
    ]
  },
  {
    id: 'ios',
    title: 'iOS',
    description: 'Set up Japanese input on iPhone/iPad',
    steps: [
      {
        title: 'Add Japanese Keyboard',
        description: 'Enable Japanese keyboard in iOS settings',
        details: [
          'Open Settings app',
          'Go to General > Keyboard > Keyboards',
          'Tap "Add New Keyboard..."',
          'Select "Japanese"',
          'Choose "Kana" or "Romaji" (or both)'
        ]
      },
      {
        title: 'Switch Keyboards',
        description: 'Toggle between keyboards while typing',
        details: [
          'When typing, tap the globe icon on the keyboard',
          'Or press and hold the globe icon to see all keyboards',
          'Select the Japanese keyboard',
          'Toggle between hiragana, katakana, and numbers using the keys'
        ]
      },
      {
        title: 'Use Predictive Text',
        description: 'Take advantage of Japanese predictive text',
        details: [
          'Type in romaji and conversion suggestions will appear',
          'Tap the desired conversion from the suggestion bar',
          'Use the arrow keys to cycle through more options',
          'Swipe left/right on suggestions for more choices'
        ]
      }
    ],
    troubleshooting: [
      {
        problem: 'Globe icon not appearing',
        solution: 'Make sure you have more than one keyboard enabled. The globe only appears when multiple keyboards are available.'
      },
      {
        problem: 'Japanese keyboard not in the list',
        solution: 'Check if your iOS version supports Japanese input. Update to the latest iOS version if needed.'
      }
    ]
  },
  {
    id: 'android',
    title: 'Android',
    description: 'Set up Japanese input on Android devices',
    steps: [
      {
        title: 'Install Gboard',
        description: 'Get Google\'s keyboard app',
        details: [
          'Download Gboard from Google Play Store if not already installed',
          'Open Gboard app or go to Settings > Languages & input',
          'Set Gboard as your default keyboard'
        ]
      },
      {
        title: 'Add Japanese Language',
        description: 'Enable Japanese in Gboard',
        details: [
          'Open Gboard settings',
          'Tap "Languages"',
          'Tap "Add keyboard"',
          'Select "Japanese"',
          'Choose your preferred layout (12-key, QWERTY, or handwriting)'
        ]
      },
      {
        title: 'Switch Languages',
        description: 'Toggle between input languages',
        details: [
          'When typing, tap the space bar and hold',
          'Swipe to switch between languages',
          'Or tap the language key if available',
          'Use the あ/A key to switch between hiragana and romaji'
        ]
      }
    ],
    troubleshooting: [
      {
        problem: 'Japanese not showing up in language list',
        solution: 'Make sure Gboard is updated to the latest version. Some older versions may not support all languages.'
      },
      {
        problem: 'Conversion not working properly',
        solution: 'Clear Gboard cache in app settings and re-add the Japanese language.'
      }
    ]
  }
];

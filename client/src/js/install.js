const butInstall = document.getElementById('buttonInstall'); // jw, 'buttonInstall' in index.html, i.e., "Install!" button

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// jw, updated from lecture #24
// jw, study source: https://web.dev/codelab-make-installable/
window.addEventListener('beforeinstallprompt', (event) => {
   event.preventDefault(); // jw, prevent the default behavior: default mini-infobar or install dialog from apperaring on mobile
   window.deferredPrompt = event; // jw, stash the event so it can be triggered later.
   butInstall.classList.toggle('hidden', false); // jw, remove the 'hidden' class from the install button container, i.e., show the button
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
   console.log('🚀 - butInstall clicked');
   const promptEvent = window.deferredPrompt;
   if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
   }
   // Show the install prompt.
   promptEvent.prompt();
   // Log the result
   const result = await promptEvent.userChoice;
   console.log('🚀 - userChoice', result);
   // Reset the deferred prompt variable, since
   // prompt() can only be called once.
   window.deferredPrompt = null;
   // Hide the install button.
   butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
   console.log('👍','appinstalled', event);
   // Clear the deferredPrompt so it can be garbage collected
   window.deferredPrompt = null;
});

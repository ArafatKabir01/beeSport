export default function hideRechartsConsoleError() {
  const originalConsoleError = console.error;

  console.error = (...args: any) => {
    // Check if the error message contains the "validateDOMNesting" warning
    if (args.length > 0 && typeof args[0] === 'string' && args[0].includes('validateDOMNesting')) {
      return;
    }

    // If not the specific error you want to hide, call the original console.error
    originalConsoleError(...args);
  };
}

class Utils {
  /**
   * Creates an array of numbers from start to end (inclusive)
   * @param start The starting number
   * @param end The ending number
   * @param step The increment between numbers (default: 1)
   * @returns Array of numbers in sequence
   */
  static range(start: number, end: number, step: number = 1): number[] {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, i) => start + (i * step));
  }

  /**
   * Formats a date to a localized string
   * @param date The date to format
   * @param options Intl.DateTimeFormatOptions
   * @returns Formatted date string
   */
  static formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    return date.toLocaleString('en-US', options || defaultOptions);
  }

  /**
   * Truncates a string to a specified length and adds ellipsis if needed
   * @param str The string to truncate
   * @param maxLength Maximum length before truncation
   * @returns Truncated string
   */
  static truncateString(str: string, maxLength: number): string {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }
}

export default Utils;
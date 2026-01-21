import subprocess
import sys
import shutil
import argparse
import time

def check_yt_dlp_installed():
    """Check if yt-dlp is available in the PATH."""
    return shutil.which("yt-dlp") is not None

def download_video(url, browser=None, cookies_file=None, po_token=None):
    """
    Download video using yt-dlp with advanced anti-bot evasion strategies.
    """
    if not check_yt_dlp_installed():
        print("Error: yt-dlp is not installed. Please run 'pip install yt-dlp' first.")
        sys.exit(1)

    print(f"Starting download for: {url}")

    # Base command with best quality selection
    base_command = ["yt-dlp", "-f", "bestvideo+bestaudio/best", "--progress"]

    # Strategy 1: User-Agent Spoofing (Modern Chrome on Windows)
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    base_command.extend(["--user-agent", user_agent])

    # Strategy 2: Cookies (Crucial for bypass)
    if browser:
        print(f"Using cookies from browser: {browser}")
        base_command.extend(["--cookies-from-browser", browser])
    elif cookies_file:
        print(f"Using cookies from file: {cookies_file}")
        base_command.extend(["--cookies", cookies_file])

    # Strategy 3: PO Token (Proof of Origin) - Experimental bypass
    if po_token:
        print("Using PO Token for verification bypass...")
        # Note: Syntax may vary by yt-dlp version, using common extractor arg format
        base_command.extend(["--extractor-args", f"youtube:po_token={po_token}"])

    # Strategy 4: Client Spoofing Attempts
    # We will try different clients if the first one fails
    clients_to_try = [
        "android",      # Often most reliable
        "web",          # Standard
        "ios",          # Alternative mobile
    ]

    for client in clients_to_try:
        print(f"\n[Attempt] Trying with client: {client}")

        current_command = base_command.copy()
        current_command.extend(["--extractor-args", f"youtube:player_client={client}"])
        current_command.append(url)

        try:
            # Run yt-dlp
            result = subprocess.run(current_command, check=True)
            if result.returncode == 0:
                print(f"\n[Success] Download completed successfully using client '{client}'.")
                return
        except subprocess.CalledProcessError as e:
            print(f"[Failed] Client '{client}' failed with exit code {e.returncode}.")
            # Continue to next client
            time.sleep(1) # Brief pause before retry

    print("\n[Error] All download attempts failed.")
    print("Suggestion: Wait for a few hours or update yt-dlp again.")
    sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Advanced Video Downloader using yt-dlp")
    parser.add_argument("url", help="The URL of the video to download")
    parser.add_argument("--browser", help="Browser to extract cookies from (e.g., chrome, edge)", default=None)
    parser.add_argument("--cookies-file", help="Path to Netscape formatted cookies.txt file", default=None)
    parser.add_argument("--po-token", help="YouTube PO Token (visitorData) for advanced bypass", default=None)

    args = parser.parse_args()

    download_video(args.url, args.browser, args.cookies_file, args.po_token)

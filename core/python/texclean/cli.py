import argparse
import sys
from . import clean

def main():
    parser = argparse.ArgumentParser(description="Texclean: Robust text cleaning utility")
    parser.add_argument("file", nargs="?", help="Input file path. If omitted, reads from stdin.")
    
    args = parser.parse_args()
    
    input_text = ""
    
    if args.file:
        try:
            with open(args.file, "r", encoding="utf-8") as f:
                input_text = f.read()
        except Exception as e:
            sys.stderr.write(f"Error reading file: {e}\n")
            sys.exit(1)
    else:
        # Read from stdin
        if sys.stdin.isatty():
             # If no input provided and tty, just show help
             parser.print_help()
             sys.exit(0)
        input_text = sys.stdin.read()
        
    cleaned_text = clean(input_text)
    sys.stdout.write(cleaned_text)

if __name__ == "__main__":
    main()

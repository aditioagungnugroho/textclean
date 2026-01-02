import unicodedata
import re

def clean(text, options=None):
    """
    Cleans text based on provided options.
    """
    defaults = {
        "trim": True,
        "collapse_spaces": True,
        "normalize_newlines": True,
        "remove_zero_width": True,
        "normalize_nbsp": True,
        "preserve_emojis": True,
        "preserve_accents": True,
    }
    
    if options is None:
        options = {}
        
    config = {**defaults, **options}
    
    if not text:
        return ""
        
    cleaned = text
    
    # 1. Remove Zero-width characters
    if config["remove_zero_width"]:
        # \u200B: Zero Width Space
        # \uFEFF: Zero Width No-Break Space (BOM)
        # \u200C: Zero Width Non-Joiner
        # \u200D: Zero Width Joiner
        cleaned = re.sub(r'[\u200B\uFEFF\u200C\u200D]', '', cleaned)

    # 2. Normalize Newlines
    if config["normalize_newlines"]:
        cleaned = struct_normalize_newlines(cleaned)

    # 3. Normalize Non-Breaking Spaces
    if config["normalize_nbsp"]:
        cleaned = cleaned.replace('\u00A0', ' ')

    # 4. Collapse Multiple Spaces
    if config["collapse_spaces"]:
        # Collapse horizontal whitespace
        cleaned = re.sub(r'[ \t]+', ' ', cleaned)

    # 5. Trim
    if config["trim"]:
        lines = cleaned.split('\n')
        cleaned = '\n'.join(line.strip() for line in lines)
        
    # Re-apply unicode normalization to NFC
    cleaned = unicodedata.normalize('NFC', cleaned)
    
    return cleaned

def struct_normalize_newlines(text):
    return text.replace('\r\n', '\n').replace('\r', '\n')

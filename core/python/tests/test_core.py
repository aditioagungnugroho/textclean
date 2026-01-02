import pytest
from texclean import clean

def test_trim_whitespace():
    assert clean('  hello world  ') == 'hello world'

def test_collapse_multiple_spaces():
    assert clean('hello   world') == 'hello world'

def test_normalize_newlines():
    assert clean('hello\r\nworld') == 'hello\nworld'
    assert clean('hello\rworld') == 'hello\nworld'

def test_remove_zero_width():
    assert clean('hello\u200Bworld') == 'helloworld'

def test_normalize_nbsp():
    assert clean('hello\u00A0world') == 'hello world'

def test_handle_unicode_accents():
    assert clean('café') == 'café'

def test_handle_emojis():
    assert clean('hello 🌍') == 'hello 🌍'

def test_trim_per_line():
    assert clean('  line1  \n  line2  ') == 'line1\nline2'

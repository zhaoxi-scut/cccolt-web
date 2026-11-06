"""Indent terminal output while preserving SSH prompts and SCP progress."""

import fcntl
import os
import pty
import shutil
import struct
import sys
import termios


def main():
    if len(sys.argv) < 2:
        print("Usage: deploy-output.py COMMAND [ARG ...]", file=sys.stderr)
        return 2

    line_start = True

    def read_output(master_fd):
        nonlocal line_start

        # Leave room for the prefix so progress lines fit the outer terminal.
        columns, rows = shutil.get_terminal_size()
        fcntl.ioctl(
            master_fd,
            termios.TIOCSWINSZ,
            struct.pack("HHHH", rows, max(columns - 2, 1), 0, 0),
        )
        data = os.read(master_fd, 4096)
        output = bytearray()
        for byte in data:
            if byte in (10, 13):  # Both newlines and progress-bar redraws.
                output.append(byte)
                line_start = True
            else:
                if line_start:
                    output.extend(b"  ")
                    line_start = False
                output.append(byte)
        return bytes(output)

    # A pipe would hide SCP progress and miss password prompts on /dev/tty.
    # pty.spawn also forwards keyboard input and restores terminal settings.
    status = pty.spawn(sys.argv[1:], master_read=read_output)
    exit_code = os.waitstatus_to_exitcode(status)
    return exit_code if exit_code >= 0 else 128 - exit_code


if __name__ == "__main__":
    sys.exit(main())

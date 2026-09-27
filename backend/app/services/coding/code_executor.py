import time
import subprocess
import tempfile
from pathlib import Path
from typing import Dict


DOCKER_IMAGE = "python:3.12-slim"
TIMEOUT_SECONDS = 5


def execute_code(
    code: str,
    language: str,
    input_data: str
) -> Dict:
    if language.lower() != "python":
        return {
            "status": "failed",
            "output": "",
            "error": "Unsupported language"
        }

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        code_file = temp_path / "solution.py"

        code_file.write_text(code)

        try:
            start_time = time.perf_counter()
            result = subprocess.run(
                [
                    "docker",
                    "run",
                    "--rm",
                    "-i",
                    "--network", "none",
                    "--memory", "128m",
                    "--cpus", "0.5",
                    "-v",
                    f"{temp_path}:/code:ro",
                    DOCKER_IMAGE,
                    "python",
                    "/code/solution.py"
                ],
                input=input_data,
                text=True,
                capture_output=True,
                timeout=TIMEOUT_SECONDS
            )

            execution_time = round(
                (time.perf_counter() - start_time) * 1000
            )

            if result.returncode == 0:
                return {
                    "status": "completed",
                    "output": result.stdout.strip(),
                    "error": result.stderr.strip(),
                    "execution_time": execution_time
                }

            return {
                "status": "failed",
                "output": result.stdout.strip(),
                "error": result.stderr.strip(),
                "execution_time": execution_time
            }

        except subprocess.TimeoutExpired:
            return {
                "status": "timeout",
                "output": "",
                "error": "Code execution timed out."
            }

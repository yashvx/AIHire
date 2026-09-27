from pathlib import Path

from openai import OpenAI, RateLimitError

from app.core.config import OPENAI_API_KEY


def transcribe_audio(audio_path: str) -> str:
    path = Path(audio_path)

    if not path.exists():
        raise FileNotFoundError(
            f"Audio file not found: {audio_path}"
        )

    if path.stat().st_size == 0:
        raise ValueError(
            "Audio file is empty"
        )

    if not OPENAI_API_KEY:
        raise ValueError(
            "OPENAI_API_KEY is not configured"
        )

    client = OpenAI(api_key=OPENAI_API_KEY)

    try:
        with path.open("rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="gpt-4o-mini-transcribe",
                file=audio_file
            )

        return transcription.text

    except RateLimitError:
        raise RuntimeError(
            "Speech-to-text service is currently unavailable because "
            "the OpenAI API account has no available credits."
        )

#!pip install -q kokoro>=0.9.2 soundfile
#!apt-get -qq -y install espeak-ng > /dev/null 2>&1
from kokoro import KPipeline
from IPython.display import display, Audio
import soundfile as sf
import torch
pipeline = KPipeline(lang_code='a')
text1 = '''
[Kokoro](/kˈOkəɹO/) is an open-weight TTS model with 82 million parameters. Despite its lightweight architecture, it delivers comparable quality to larger models while being significantly faster and more cost-efficient. With Apache-licensed weights, [Kokoro](/kˈOkəɹO/) can be deployed anywhere from production environments to personal projects.
'''
text = '''Creating new db connections everywhere? This [Go] code opens a new database connection every time we call the function. That means wasted resources and performance problems. Instead, we should create one shared connection.., Here is how we fix it using the [Singleton] pattern in [Go..]. The magic happens with [syncOnce]. It ensures that the function inside it runs only once, even if multiple parts of our code call it.'''

share = "If this helped!, Follow for more practical dev tips."

generator = pipeline(share, voice='am_adam')
for i, (gs, ps, audio) in enumerate(generator):
    print(i, gs, ps)
    display(Audio(data=audio, rate=24000, autoplay=i==0))
    sf.write(f'share.wav', audio, 24000)

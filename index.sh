mkdir -p ffmpeg

download () {
	curl -L $1 -o $2
}

echo 'darwin'
echo '  downloading from evermeet.cx'
download 'https://evermeet.cx/ffmpeg/ffmpeg-5.0.zip' darwin.zip
echo '  extracting'
mkdir -p ffmpeg/darwin
unzip -o -d ffmpeg/darwin -j darwin.zip ffmpeg

echo 'linux ia32'
echo '  downloading from johnvansickle.com'
download 'https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz' linux-ia32.tar.xz
echo '  extracting'
mkdir -p ffmpeg/linux-ia32
tar -xf linux-ia32.tar.xz -C ffmpeg/linux-ia32 --strip-components=1

echo 'linux x64'
echo '  downloading from johnvansickle.com'
download 'https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz' linux-x64.tar.xz
echo '  extracting'
mkdir -p ffmpeg/linux-x64
tar -xf linux-x64.tar.xz -C ffmpeg/linux-x64 --strip-components=1

echo 'linux arm'
echo '  downloading from johnvansickle.com'
download 'https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-armhf-static.tar.xz' linux-arm.tar.xz
echo '  extracting'
mkdir -p ffmpeg/linux-arm
tar -xf linux-arm.tar.xz -C ffmpeg/linux-arm --strip-components=1

echo 'linux arm64'
echo '  downloading from johnvansickle.com'
download 'https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-arm64-static.tar.xz' linux-arm64.tar.xz
echo '  extracting'
mkdir -p ffmpeg/linux-arm64
tar -xf linux-arm64.tar.xz -C ffmpeg/linux-arm64 --strip-components=1

echo 'windows x86'
echo '  downloading from github.com'
download 'https://github.com/sudo-nautilus/FFmpeg-Builds-Win32/releases/download/latest/ffmpeg-n5.0-latest-win32-gpl-5.0.zip' windows-x86.zip
echo '  extracting'
mkdir -p ffmpeg/windows-x86
unzip -o -d ffmpeg/windows-x86 -j windows-x86.zip '*/bin/ffmpeg.exe'

echo 'windows x64'
echo '  downloading from github.com'
download 'https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-n5.0-latest-win64-gpl-5.0.zip' windows-x64.zip
echo '  extracting'
mkdir -p ffmpeg/windows-x64
unzip -o -d ffmpeg/windows-x64 -j windows-x64.zip '*/bin/ffmpeg.exe'
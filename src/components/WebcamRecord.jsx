import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaMicrophone, FaTimes } from "react-icons/fa";

const WebcamRecorder = ({ isRecording, onSaveRecord }) => {
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const [facingMode, setFacingMode] = useState("user"); // Default to front camera
  const [videoConstraints, setVideoConstraints] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: facingMode,
  });
  const [cameras, setCameras] = useState([]);
  const [microphones, setMicrophones] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showCameraPopup, setShowCameraPopup] = useState(false);
  const [showMicrophonePopup, setShowMicrophonePopup] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const handleResize = () => {
      setVideoConstraints({
        width: window.innerWidth,
        height: window.innerHeight,
        facingMode: facingMode,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [facingMode]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else if (
      mediaRecorder.current &&
      mediaRecorder.current.state === "recording"
    ) {
      stopRecording();
    }
  }, [isRecording]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const audioDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );
        setCameras(videoDevices);
        setMicrophones(audioDevices);
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
        if (audioDevices.length > 0) {
          setSelectedMicrophone(audioDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    getDevices();
  }, []);

  useEffect(() => {
    if (selectedCamera) {
      setVideoConstraints({
        width: window.innerWidth,
        height: window.innerHeight,
        deviceId: selectedCamera,
      });
    }
  }, [selectedCamera]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
        },
        audio: {
          deviceId: selectedMicrophone
            ? { exact: selectedMicrophone }
            : undefined,
        },
      });
      videoRef.current.srcObject = stream;

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/mp4" });
        recordedChunks.current = [];
        const file = new File([blob], "recorded-video.mp4", {
          type: "video/mp4",
        });
        onSaveRecord(file);
      };

      mediaRecorder.current.start();

      audioContext.current = new AudioContext();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);
      analyser.current.fftSize = 2048;
      const bufferLength = analyser.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        analyser.current.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += Math.abs(dataArray[i] - 128);
        }
        const average = sum / bufferLength;
        setAudioLevel(average);
        requestAnimationFrame(updateAudioLevel);
      };

      updateAudioLevel();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    if (audioContext.current) {
      audioContext.current.close();
    }
  };

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "environment" ? "user" : "environment"
    );
  };

  return (
    <div
      className={`flex h-[80%] w-full ${isMobile ? "fixed top-0 left-0" : ""}`}
    >
      <Webcam
        imageSmoothing={true}
        audio={true}
        ref={videoRef}
        muted={true}
        videoConstraints={videoConstraints}
        className={`3xl:rounded-3xl shadow shadow-black w-full h-full object-cover ${
          isMobile ? "absolute top-0 left-0 w-full h-full " : ""
        }`}
        style={{ transform: "scaleX(-1)" }}
      />
      {!isMobile && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
          <div className="mb-4">
            <FaCamera
              className="text-white cursor-pointer w-6 h-6 hover:text-hoverrtw"
              onClick={() => setShowCameraPopup(true)}
            />
            {showCameraPopup && (
              <div className="absolute top-12 left-5 bg-rtw p-5 rounded-xl shadow text-white overflow-y-auto max-h-80">
                <FaTimes
                  className="absolute top-2 right-2 cursor-pointer text-gray-500"
                  onClick={() => setShowCameraPopup(false)}
                />
                {cameras.map((camera) => (
                  <div
                    key={camera.deviceId}
                    onClick={() => {
                      setSelectedCamera(camera.deviceId);
                      setShowCameraPopup(false);
                    }}
                    className="cursor-pointer w-80 bg-rtw p-2 hover:bg-hoverrtw"
                  >
                    {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <FaMicrophone
              className="text-white cursor-pointer w-6 h-6 hover:text-hoverrtw"
              onClick={() => setShowMicrophonePopup(true)}
            />
            {showMicrophonePopup && (
              <div className="absolute top-12 left-5 bg-rtw p-5 rounded-xl shadow text-white overflow-y-auto max-h-80">
                <FaTimes
                  className="absolute top-2 right-2 cursor-pointer text-gray-500"
                  onClick={() => setShowMicrophonePopup(false)}
                />
                {microphones.map((microphone) => (
                  <div
                    key={microphone.deviceId}
                    onClick={() => {
                      setSelectedMicrophone(microphone.deviceId);
                      setShowMicrophonePopup(false);
                    }}
                    className="cursor-pointer w-80 bg-rtw p-2 hover:bg-hoverrtw"
                  >
                    {microphone.label ||
                      `Microphone ${microphones.indexOf(microphone) + 1}`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-gray-800 w-4 h-40 rounded-full overflow-hidden flex flex-col-reverse">
            <div
              className="bg-rtw w-4 rounded-t-full"
              style={{ height: `${Math.min(audioLevel, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamRecorder;

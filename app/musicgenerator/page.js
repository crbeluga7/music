'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import Header from '@/components/header';
import Footer from '@/components/Footer';

const API_KEY = 'L3OMwNgR_KHg1IVCDhCSmQ'; 
const BASE_URL = 'https://public-api.beatoven.ai/api/v1';

async function createTrack(prompt) {
    try {
        const response = await axios.post(
            `${BASE_URL}/tracks`,
            { prompt: { text: prompt } },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );
        return response.data.tracks[0];
    } catch (error) {
        console.error('Error creating track:', error);
        throw error;
    }
}

async function composeTrack(trackId) {
    try {
        const response = await axios.post(
            `${BASE_URL}/tracks/compose/${trackId}`,
            { format: 'mp3', looping: false },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );
        return response.data.task_id; 
    } catch (error) {
        console.error('Error composing track:', error);
        throw error;
    }
}

async function checkCompositionStatus(taskId) {
    try {
        const response = await axios.get(`${BASE_URL}/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error checking status:', error);
        throw error;
    }
}

export default function SongGenerator() {
    const [prompt, setPrompt] = useState('');
    const [genre, setGenre] = useState('');
    const [mood, setMood] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingTextIndex, setLoadingTextIndex] = useState(0);
    const audioRef = useRef(null);

    const loadingTexts = [
        'Creating your track...',
        'Composing music...',
        'Finalizing your song...'
    ];

    const generateSong = async () => {
        if (!prompt.trim() || !genre.trim() || !mood.trim()) return;

        setLoading(true);
        setLoadingTextIndex(0);

        const interval = setInterval(() => {
            setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
        }, 1500);

        // Combine genre, mood, and prompt into a single string
        const fullPrompt = `30 seconds ${mood} ${genre} track ${prompt}`;

        try {
            // Step 1: Create the track
            const trackId = await createTrack(fullPrompt);
            if (!trackId) throw new Error('Track creation failed');

            // Step 2: Compose the track
            const taskId = await composeTrack(trackId);
            if (!taskId) throw new Error('Composition failed');

            // Step 3: Poll for composition status
            let statusData;
            do {
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Poll every 2 seconds
                statusData = await checkCompositionStatus(taskId);
            } while (statusData.status !== 'composed');

            // Step 4: Set the audio source (no autoplay)
            const trackUrl = statusData.meta.track_url;
            setAudioSrc(trackUrl);
        } catch (error) {
            setAudioSrc('');
            alert('Failed to generate song. Please try again.');
        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <audio ref={audioRef} />
            <div className="flex items-center justify-center min-h-screen bg-white text-black p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center text-lg font-semibold">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="mt-4">{loadingTexts[loadingTextIndex]}</p>
                    </div>
                ) : (
                    <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-center mb-4">Song Generator</h1>
                        <div className="flex gap-4 mb-4">
                            <input
                                type="text"
                                className="w-1/2 p-2 border rounded text-sm"
                                placeholder="Genre (e.g., lo-fi)"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-1/2 p-2 border rounded text-sm"
                                placeholder="Mood (e.g., peaceful)"
                                value={mood}
                                onChange={(e) => setMood(e.target.value)}
                            />
                        </div>
                        <textarea
                            className="w-full p-2 mb-4 border rounded resize-none"
                            rows="4"
                            placeholder="Enter additional song details (e.g., 'chill hop track')"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                            onClick={generateSong}
                            disabled={loading || !prompt.trim() || !genre.trim() || !mood.trim()}
                        >
                            Generate Song
                        </button>
                        {audioSrc && (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold">Your Song:</h2>
                                <audio
                                    controls
                                    src={audioSrc}
                                    className="w-full mt-2"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
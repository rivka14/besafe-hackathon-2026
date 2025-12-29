let videos = [];

// Create a synthetic video record (server-side stub)
const createVideo = (req, res) => {
    const { title, script } = req.body;
    const id = videos.length ? videos[videos.length - 1].id + 1 : 1;
    const video = {
        id,
        title: title || 'Synthetic Video',
        script: script || '',
        // In a real implementation, you'd call an AI/video service and store metadata/url
        url: `/videos/${id}`,
        synthetic: true,
    };
    videos.push(video);
    res.status(201).json({ video });
};

// Get a created video (for previewing)
const getVideo = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const video = videos.find(v => v.id === id);
    if (!video) return res.status(404).json({ mssg: 'Video not found' });
    res.status(200).json({ video });
};

export { createVideo, getVideo };

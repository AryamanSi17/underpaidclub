import { generateAndSave, getResumePdf } from './resume.service.js';

export const generateResume = async (req, res) => {
  try {
    await generateAndSave(req.user._id);
    return res.status(200).json({ success: true, message: 'Resume generated successfully' });
  } catch (err) {
    console.error('Resume generation error:', err);
    return res.status(500).json({ success: false, message: 'Failed to generate resume' });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const pdf = await getResumePdf(req.user._id);
    if (!pdf) {
      return res.status(404).json({ success: false, message: 'No resume generated yet' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${req.user.name.replace(/\s+/g, '_')}_TUC_Resume.pdf"`);
    return res.send(pdf);
  } catch (err) {
    console.error('Resume download error:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve resume' });
  }
};

export const previewResume = async (req, res) => {
  try {
    const pdf = await getResumePdf(req.user._id);
    if (!pdf) {
      return res.status(404).json({ success: false, message: 'No resume generated yet' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    return res.send(pdf);
  } catch (err) {
    console.error('Resume preview error:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve resume' });
  }
};

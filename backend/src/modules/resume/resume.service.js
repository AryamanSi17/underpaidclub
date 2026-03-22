import PDFDocument from 'pdfkit';
import Resume from '../../models/Resume.js';
import User from '../../models/User.js';

const GOLD = '#d4af37';
const BLACK = '#030303';
const WHITE = '#ffffff';
const GRAY = '#a1a1aa';

export const generateResumePdf = (user) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 0 });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W = 595.28;
    const H = 841.89;

    // Background
    doc.rect(0, 0, W, H).fill(BLACK);

    // Gold sidebar strip
    doc.rect(0, 0, 6, H).fill(GOLD);

    // Header area
    doc.rect(0, 0, W, 110).fill('#0d0d0d');
    doc.rect(0, 108, W, 2).fill(GOLD);

    // Name
    doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(26)
      .text(user.name || '', 30, 22, { width: W - 60 });

    // Bio
    if (user.bio) {
      doc.fillColor(GOLD).font('Helvetica-Oblique').fontSize(11)
        .text(`"I am best at ${user.bio}"`, 30, 55, { width: W - 60 });
    }

    // Email + preferred role
    const meta = [user.email, user.college, user.preferredRole ? `Open to: ${user.preferredRole}` : '']
      .filter(Boolean).join('  ·  ');
    doc.fillColor(GRAY).font('Helvetica').fontSize(9)
      .text(meta, 30, 80, { width: W - 60 });

    let y = 128;

    const sectionTitle = (title) => {
      doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10)
        .text(title.toUpperCase(), 30, y);
      y += 14;
      doc.rect(30, y, W - 60, 1).fill(GOLD);
      y += 8;
    };

    const body = (text, indent = 0) => {
      doc.fillColor(WHITE).font('Helvetica').fontSize(9.5)
        .text(text, 30 + indent, y, { width: W - 60 - indent });
      y += doc.heightOfString(text, { width: W - 60 - indent }) + 4;
    };

    const label = (key, value) => {
      if (!value) return;
      doc.fillColor(GRAY).font('Helvetica-Bold').fontSize(9).text(`${key}: `, 30, y, { continued: true, width: W - 60 });
      doc.fillColor(WHITE).font('Helvetica').fontSize(9).text(value);
      y += 14;
    };

    // Education
    sectionTitle('Education');
    const edu = [user.college, user.branch, user.year ? `Year ${user.year}` : '', user.expectedGraduation ? `Graduating ${user.expectedGraduation}` : '']
      .filter(Boolean).join(' · ');
    body(edu);
    y += 4;

    // Skills
    if (user.skills?.length) {
      sectionTitle('Skills');
      body(user.skills.join('  ·  '));
      y += 4;
    }

    // Experience
    if (user.experience?.length) {
      sectionTitle('Experience');
      for (const exp of user.experience) {
        doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9.5)
          .text(`${exp.role} @ ${exp.company}`, 30, y, { width: W - 60 });
        y += 13;
        if (exp.description) {
          doc.fillColor(GRAY).font('Helvetica').fontSize(9)
            .text(exp.description, 30, y, { width: W - 60 });
          y += doc.heightOfString(exp.description, { width: W - 60 }) + 8;
        }
      }
      y += 4;
    }

    // Links
    sectionTitle('Links');
    if (user.github) label('GitHub', user.github);
    if (user.linkedin) label('LinkedIn', user.linkedin);
    if (user.twitter) label('Twitter', user.twitter);
    if (user.portfolio) label('Portfolio', user.portfolio);
    y += 4;

    // Hustle Score badge
    if (user.hustleScore != null) {
      sectionTitle('Hustle Score');
      doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(20)
        .text(`${user.hustleScore} / 100`, 30, y);
      y += 28;
      doc.fillColor(GRAY).font('Helvetica').fontSize(8)
        .text('Verified by The Underestimate Club logic test', 30, y);
      y += 14;
    }

    // Footer
    doc.rect(0, H - 28, W, 28).fill('#0d0d0d');
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(8)
      .text('THE UNDERESTIMATE CLUB', 30, H - 19);
    doc.fillColor(GRAY).font('Helvetica').fontSize(8)
      .text('underestimateclub.in', W - 160, H - 19, { align: 'right', width: 130 });

    doc.end();
  });
};

export const generateAndSave = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const pdfData = await generateResumePdf(user);

  await Resume.findOneAndUpdate(
    { userId },
    { pdfData, generatedAt: new Date() },
    { upsert: true }
  );

  user.resumeGeneratedAt = new Date();
  await user.save();

  return pdfData;
};

export const getResumePdf = async (userId) => {
  const resume = await Resume.findOne({ userId });
  if (!resume) return null;
  return resume.pdfData;
};

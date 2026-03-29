import React from 'react';
import { Upload, Trash2, Eye } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';

const ResumeItem = ({ label, filename, date, onView, onDelete }) => {
  return (
    <Card className="mb-4 flex items-center justify-between py-4" hoverEffect={false}>
      <div className="flex-1">
        <div className="text-white text-[16px] font-bold">{label}</div>
        <div className="text-[#888888] text-[12px]">{filename} · {date}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={onView} className="p-2 text-[#888888] hover:text-white transition-colors">
          <Eye size={18} />
        </button>
        <button onClick={onDelete} className="p-2 text-[#888888] hover:text-[#FF4444] transition-colors">
          <Trash2 size={18} />
        </button>
      </div>
    </Card>
  );
};

const ResumeSection = ({ resumes = [], onUpload }) => {
  const maxResumes = 3;
  const canUpload = resumes.length < maxResumes;

  return (
    <section className="mt-12">
      <h2 className="text-white text-[22px] font-bold mb-6">Your Resumes</h2>
      
      {resumes.map((resume, idx) => (
        <ResumeItem 
          key={idx} 
          {...resume} 
          onView={() => console.log('View')} 
          onDelete={() => console.log('Delete')} 
        />
      ))}

      {canUpload ? (
        <div 
          onClick={onUpload}
          className="border-2 border-dashed border-[#2A2A2A] rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#00FF85]/40 transition-all bg-[#111111]/30 group"
        >
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#888888] group-hover:text-[#00FF85] transition-colors mb-4">
            <Upload size={24} />
          </div>
          <div className="text-white text-[16px] font-bold mb-1">Upload a new resume</div>
          <div className="text-[#888888] text-[14px]">PDF only. Max 5MB.</div>
        </div>
      ) : (
        <div className="text-[#888888] text-[14px] italic">
          You have {maxResumes} resumes saved. Delete one to upload a new version.
        </div>
      )}
    </section>
  );
};

export default ResumeSection;

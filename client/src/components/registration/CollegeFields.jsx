import { useDropzone } from 'react-dropzone';
import { Upload, CircleCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../hooks/useAuth';

export default function CollegeFields({ formData, setFormData }) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `student-ids/${user.uid}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
        console.error(error);
        setUploading(false);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData(prev => ({ ...prev, studentIdUrl: downloadURL }));
        setUploading(false);
      }
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'], 'application/pdf': ['.pdf'] },
    maxFiles: 1 
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        {['IILM', 'OTHER'].map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, collegeType: type }))}
            className={`p-6 border text-left transition-all group ${
              formData.collegeType === type 
                ? 'border-fire bg-fire/5 shadow-fire' 
                : 'border-[var(--border-subtle)] hover:border-secondary'
            }`}
          >
            <div className={`font-display text-xl mb-1 ${formData.collegeType === type ? 'text-fire' : 'text-primary'}`}>
              {type === 'IILM' ? '🏛 IILM UNIVERSITY' : '🎓 OTHER COLLEGE'}
            </div>
            <div className="font-mono text-[9px] text-muted tracking-[1px] uppercase group-hover:text-secondary">
              {type === 'IILM' ? 'GR. NOIDA CAMPUS' : 'UNIVERSITY / INSTITUTE'}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {formData.collegeType === 'IILM' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase">Year</label>
              <select 
                name="year" 
                value={formData.year} 
                onChange={handleInput}
                className="w-full bg-void border border-[var(--border-subtle)] outline-none px-4 py-3.5 font-mono text-sm text-primary"
              >
                <option value="">SELECT YEAR</option>
                <option value="1st">1ST YEAR</option>
                <option value="2nd">2ND YEAR</option>
                <option value="3rd">3RD YEAR</option>
                <option value="4th">4TH YEAR</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase">Course</label>
              <input 
                name="course" 
                placeholder="B.TECH CSE, LAW, etc." 
                value={formData.course} 
                onChange={handleInput}
                className="w-full bg-void border border-[var(--border-subtle)] outline-none px-4 py-3.5 font-mono text-sm text-primary"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase">Roll Number</label>
              <input 
                name="rollNumber" 
                placeholder="UNIVERSITY ROLL NO." 
                value={formData.rollNumber} 
                onChange={handleInput}
                className="w-full bg-void border border-[var(--border-subtle)] outline-none px-4 py-3.5 font-mono text-sm text-primary"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase">College Name</label>
              <input 
                name="collegeName" 
                placeholder="ENTER YOUR INSTITUTE NAME" 
                value={formData.collegeName} 
                onChange={handleInput}
                className="w-full bg-void border border-[var(--border-subtle)] outline-none px-4 py-3.5 font-mono text-sm text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase">Upload Student ID</label>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
                  isDragActive ? 'border-cyan bg-cyan/5' : 'border-[var(--border-subtle)] hover:border-secondary'
                }`}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 size={24} className="animate-spin text-cyan" />
                    <div className="font-mono text-[10px] text-secondary">UPLOADING... {Math.round(progress)}%</div>
                  </div>
                ) : formData.studentIdUrl ? (
                  <div className="flex flex-col items-center gap-2 text-green">
                    <CircleCheck size={24} />
                    <div className="font-mono text-[10px] uppercase">ID UPLOADED SUCCESSFULLY</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} className="text-muted" />
                    <div className="font-mono text-[10px] text-muted uppercase">Drag & Drop or Click to Upload ID Card</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegistrationForm({ step, formData, setFormData }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (step === 1) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={handleInput}
              className="w-full bg-void border border-[var(--border-subtle)] focus:border-fire/50 outline-none px-4 py-3.5 font-mono text-sm tracking-[1px] text-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase ml-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 XXXXXXXXXX"
              value={formData.phone}
              onChange={handleInput}
              className="w-full bg-void border border-[var(--border-subtle)] focus:border-fire/50 outline-none px-4 py-3.5 font-mono text-sm tracking-[1px] text-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase ml-1">Course Level</label>
            <div className="flex gap-4">
              {['UG', 'PG'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, courseLevel: level }))}
                  className={`flex-1 py-3 border font-ui text-[13px] tracking-[2px] transition-all ${
                    formData.courseLevel === level 
                      ? 'border-fire bg-fire/10 text-fire' 
                      : 'border-[var(--border-subtle)] text-muted hover:border-secondary'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

import OtpInput from 'react-otp-input';

export default function OTPInput({ value, onChange, numInputs = 6 }) {
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={numInputs}
      renderSeparator={<span className="mx-1 sm:mx-2" />}
      renderInput={(props) => (
        <input
          {...props}
          className="otp-field !w-10 !h-12 sm:!w-14 sm:!h-16 text-xl sm:text-2xl font-mono"
        />
      )}
      containerStyle="justify-center"
      shouldAutoFocus
    />
  );
}

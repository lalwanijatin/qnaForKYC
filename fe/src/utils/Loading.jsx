import './Loading.css'; // For styling the centered loader

// For public folder GIFs:
const Loading = () => {
  return (
    <div className="loading-container">
      <img src="/loading.gif" alt="Loading..." className="loading-gif" />
    </div>
  );
};

export default Loading;

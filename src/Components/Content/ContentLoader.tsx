import ContentLoader from "react-content-loader";

export const EventsContent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
      }}
    >
      <ContentLoader
        speed={2}
        width={340} 
        height={200} 
        backgroundColor="#ececec"
        foregroundColor="#d0d0d0"
        style={{ borderRadius: '8px', marginBottom: '20px' }}
      >
        {/* Title */}
        <rect x="15" y="15" rx="4" ry="4" width="200" height="20" />

        {/* Description */}
        <rect x="15" y="45" rx="4" ry="4" width="250" height="15" />

        {/* Time */}
        <rect x="15" y="120" rx="4" ry="4" width="100" height="15" />

        {/* Date */}
        <rect x="15" y="140" rx="4" ry="4" width="150" height="15" />

        {/* Location */}
        <rect x="15" y="160" rx="4" ry="4" width="200" height="15" />

        {/* Edit Button */}
        <rect x="300" y="180" rx="4" ry="4" width="300" height="35" /> 
      </ContentLoader>
    </div>
  );
};

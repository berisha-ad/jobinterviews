const Container = ({ children, className }) => {
  return (
    <div className={`flex max-w-5xl mx-auto px-8 ${className}`}>{children}</div>
  );
};

export default Container;

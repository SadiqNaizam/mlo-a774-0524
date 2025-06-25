const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Streamix. All Rights Reserved.</p>
        <p className="mt-2">A demo application built with React, TypeScript, and ShadCN/UI.</p>
      </div>
    </footer>
  );
};

export default Footer;
function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="p-4 bg-slate-800 text-slate-50 text-center">
      Copyright &copy; {date}{' '}
    </div>
  );
}

export default Footer;

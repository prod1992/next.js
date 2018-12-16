import Link from "next/link";
const linkStyle = {
  color: "#FFF",
  fontFamily: "sans-serif"
};

const Header = () => (
  <div className="tml-header">
    <div>
      <Link href="/">
        <a style={linkStyle}>Home Timeline</a>
      </Link>
    </div>
  </div>
);

export default Header;

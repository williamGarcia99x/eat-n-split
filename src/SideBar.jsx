import PropTypes from "prop-types";

SideBar.propTypes = {
  children: PropTypes.array,
};

export default function SideBar({ children }) {
  return <aside className="sidebar">{children}</aside>;
}

import React from "react";

export default () => {
  return (
    <footer className="page-footer font-small mdb-color darken-3">
      <div className="footer-copyright text-center py-4">
        &copy; Copyright: {new Date().getFullYear()} {"< devLookup />"}
      </div>
    </footer>
  );
};

export default function Pagination({ meta, handlePageChange }) {

  return (
    <div className="pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* Previous Button */}
          <li className={`page-item ${meta.current_page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(meta.current_page - 1)}>
              Previous
            </button>
          </li>

          {/* loop through pages and render page numbers */}
          {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((pageNum) => (
            <li key={pageNum} className={`page-item ${meta.current_page === pageNum ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                {pageNum}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li className={`page-item ${meta.current_page === meta.last_page ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(meta.current_page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
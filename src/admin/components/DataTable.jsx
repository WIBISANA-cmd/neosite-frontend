const DataTable = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3">
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t border-white/5 hover:bg-white/5">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3">
                  {col.Cell ? col.Cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
          {!data.length && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-slate-400">
                Belum ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

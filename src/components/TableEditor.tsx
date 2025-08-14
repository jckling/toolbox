import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import ImageCropModal from './ImageCropModal';
import html2canvas from 'html2canvas';
import {
  tableEditorContainerStyle,
  configPanelStyle,
  configPanelHeadingStyle,
  configRowStyle,
  configButtonsStyle,
  controlGroupStyle,
  controlGroupLabelStyle,
  controlGroupInputsStyle,
  borderControlsStyle,
  borderControlsLabelStyle,
  borderControlsCheckboxStyle,
  colorControlStyle,
  widthControlStyle,
  resetButtonStyle,
  csvButtonStyle,
  imageButtonStyle,
  hiddenPrintableTableStyle,
  tableContainerStyle,
  tableBaseStyle,
  tableHeaderCellStyle,
  tableDataCellStyle,
  printableTableHeaderCellStyle,
  printableTableDataCellStyle,
  cellContentWrapperStyle,
  imageContainerStyle,
  cellImageStyle,
  changeImageButtonStyle,
  cellTextareaStyle,
  uploadImageButtonStyle,
  removeImageButtonStyle,
  columnHeaderInputStyle,
  dimensionControlsStyle,
  rowsRangeStyle,
  inputFieldStyle,
  numberInputStyle,
  columnsRangeStyle,
  borderColorInputStyle,
  borderWidthSelectStyle
} from '../styles/tableEditor';

interface TableCellData {
  id: string;
  content: string;
  imageUrl?: string;
}

interface TableRowData {
  id: string;
  cells: TableCellData[];
}

const TableEditor: React.FC = () => {
  // State for table dimensions
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(3);
  
  // State for table data
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  
  // State for column headers (for non-predefined columns)
  const [columnHeaders, setColumnHeaders] = useState<Record<number, string>>({});
  
  // State for border customization
  const [showBorders, setShowBorders] = useState<boolean>(true);
  const [borderColor, setBorderColor] = useState<string>('#dee2e6');
  const [borderWidth, setBorderWidth] = useState<number>(1);
  
  // State for image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ rowId: string; cellId: string } | null>(null);
  
  // Predefined column names
  const predefinedColumnNames = ['', '初印象', '现印象'];
  
  // Initialize table data when dimensions change
  React.useEffect(() => {
    const newTableData: TableRowData[] = [];
    
    for (let i = 0; i < rows; i++) {
      const cells: TableCellData[] = [];
      
      for (let j = 0; j < columns; j++) {
        cells.push({
          id: `cell-${i}-${j}`,
          content: '',
          imageUrl: undefined
        });
      }
      
      newTableData.push({
        id: `row-${i}`,
        cells
      });
    }
    
    setTableData(newTableData);
  }, [rows, columns]);
  
  // Handle text input change
  const handleTextChange = (rowIndex: number, cellIndex: number, value: string) => {
    setTableData(prev => {
      // Safety check to ensure row and cell exist
      if (rowIndex >= prev.length || cellIndex >= prev[rowIndex].cells.length) {
        return prev;
      }
      
      const newData = [...prev];
      newData[rowIndex] = {
        ...newData[rowIndex],
        cells: newData[rowIndex].cells.map((cell, idx) =>
          idx === cellIndex ? { ...cell, content: value } : cell
        )
      };
      return newData;
    });
  };
  
  // Handle image upload
  const handleImageUpload = (rowIndex: number, cellIndex: number) => {
    // Safety check to ensure row and cell exist
    if (rowIndex >= tableData.length || cellIndex >= tableData[rowIndex].cells.length) {
      return;
    }
    
    setSelectedCell({
      rowId: tableData[rowIndex].id,
      cellId: tableData[rowIndex].cells[cellIndex].id
    });
    setIsModalOpen(true);
  };
  
  // Handle image crop
  const handleImageCropped = (croppedImageUrl: string) => {
    if (selectedCell) {
      setTableData(prev => {
        return prev.map(row => {
          if (row.id === selectedCell.rowId) {
            return {
              ...row,
              cells: row.cells.map(cell => {
                if (cell.id === selectedCell.cellId) {
                  return {
                    ...cell,
                    imageUrl: croppedImageUrl,
                    content: ''
                  };
                }
                return cell;
              })
            };
          }
          return row;
        });
      });
    }
    setIsModalOpen(false);
  };
  
  // Get column header name
  const getColumnHeader = (index: number): string => {
    if (index < predefinedColumnNames.length) {
      return predefinedColumnNames[index];
    }
    
    // Return custom header if set, otherwise default
    return columnHeaders[index] || `列${index + 1}`;
  };
  
  // Handle column header change (for non-predefined columns)
  const handleColumnHeaderChange = (index: number, value: string) => {
    if (index >= predefinedColumnNames.length) {
      setColumnHeaders(prev => ({
        ...prev,
        [index]: value
      }));
    }
  };
  
  // Create columns for TanStack Table
  const columnsData = useMemo(() => {
    const cols = [];
    for (let i = 0; i < columns; i++) {
      const colIndex = i;
      cols.push({
        accessorFn: (row: TableRowData) => row.cells[colIndex] || { id: `empty-${colIndex}`, content: '', imageUrl: undefined },
        id: `col-${i}`,
        header: () => (
          <div>
            {colIndex < predefinedColumnNames.length ? (
              <div>{getColumnHeader(colIndex)}</div>
            ) : (
              <input
                type="text"
                value={getColumnHeader(colIndex)}
                onChange={(e) => handleColumnHeaderChange(colIndex, e.target.value)}
                placeholder={`列${colIndex + 1}`}
                style={{
                  ...columnHeaderInputStyle,
                  ...inputFieldStyle
                }}
              />
            )}
          </div>
        ),
        cell: ({ row, getValue, column }: any) => {
          const cellData: TableCellData = getValue();
          const rowIndex = parseInt(row.id);
          
          // Extract colIndex from the column id
          const colIndex = parseInt(column.id.split('-')[1]);
          
          return (
            <div style={cellContentWrapperStyle}>
              {cellData.imageUrl ? (
                <div style={imageContainerStyle}>
                  <img
                    src={cellData.imageUrl}
                    alt="Cell content"
                    style={cellImageStyle}
                  />
                  <button
                    onClick={() => handleImageUpload(rowIndex, colIndex)}
                    style={changeImageButtonStyle}
                  >
                    更换
                  </button>
                </div>
              ) : (
                <textarea
                  value={cellData.content}
                  onChange={(e) => handleTextChange(rowIndex, colIndex, e.target.value)}
                  placeholder={rowIndex === 0 ? "输入标题..." : "输入内容..."}
                  style={cellTextareaStyle}
                />
              )}
              
              {!cellData.imageUrl && (
                <button
                  onClick={() => handleImageUpload(rowIndex, colIndex)}
                  style={uploadImageButtonStyle}
                >
                  上传图片
                </button>
              )}
              
              {cellData.imageUrl && (
                <button
                  onClick={() => {
                    setTableData(prev => {
                      // Safety check to ensure row and cell exist
                      if (rowIndex >= prev.length || colIndex >= prev[rowIndex].cells.length) {
                        return prev;
                      }
                      
                      const newData = [...prev];
                      newData[rowIndex] = {
                        ...newData[rowIndex],
                        cells: newData[rowIndex].cells.map((cell, idx) =>
                          idx === colIndex ? { ...cell, imageUrl: undefined } : cell
                        )
                      };
                      return newData;
                    });
                  }}
                  style={removeImageButtonStyle}
                >
                  移除图片
                </button>
              )}
            </div>
          );
        },
      });
    }
    return cols;
  }, [columns, columnHeaders, tableData]);

  // Create table instance
  const table = useReactTable({
    data: tableData,
    columns: columnsData,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: false,
  });

  // Create printable table data (without input fields and buttons)
  const printableTableData = useMemo(() => {
    return tableData.map(row => ({
      ...row,
      cells: row.cells.map(cell => ({
        ...cell,
        // For display purposes, we might want to handle empty content differently
        displayContent: cell.content || (cell.imageUrl ? '[图片]' : '')
      }))
    }));
  }, [tableData]);

  return (
    <div style={tableEditorContainerStyle}>
      {/* Table configuration controls */}
      <div style={configPanelStyle}>
        <h3 style={configPanelHeadingStyle}>表格设置</h3>
        
        <div>
          {/* First row: Table dimension controls and border customization */}
          <div style={configRowStyle}>
            <div style={controlGroupStyle}>
              <label style={controlGroupLabelStyle}>
                行数 (1-20): {rows}
              </label>
              <div style={dimensionControlsStyle}>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value))}
                  style={rowsRangeStyle}
                />
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                  style={numberInputStyle}
                />
              </div>
            </div>
            
            <div style={controlGroupStyle}>
              <label style={controlGroupLabelStyle}>
                列数 (3-5): {columns}
              </label>
              <div style={controlGroupInputsStyle}>
                <input
                  type="range"
                  min="3"
                  max="5"
                  value={columns}
                  onChange={(e) => setColumns(parseInt(e.target.value))}
                  style={columnsRangeStyle}
                />
                <input
                  type="number"
                  min="3"
                  max="5"
                  value={columns}
                  onChange={(e) => setColumns(parseInt(e.target.value) || 3)}
                  style={numberInputStyle}
                />
              </div>
            </div>
            
            {/* Border customization controls */}
            <div style={controlGroupStyle}>
              <label style={controlGroupLabelStyle}>
                边框设置
              </label>
              <div style={borderControlsStyle}>
                <label style={borderControlsLabelStyle}>
                  <input
                    type="checkbox"
                    checked={showBorders}
                    onChange={(e) => setShowBorders(e.target.checked)}
                    style={borderControlsCheckboxStyle}
                  />
                  显示边框
                </label>
                
                {showBorders && (
                  <>
                    <div style={colorControlStyle}>
                      <label>颜色:</label>
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        style={borderColorInputStyle}
                      />
                    </div>
                    
                    <div style={widthControlStyle}>
                      <label>粗细:</label>
                      <select
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(Number(e.target.value))}
                        style={borderWidthSelectStyle}
                      >
                        <option value="1">1px</option>
                        <option value="2">2px</option>
                        <option value="3">3px</option>
                        <option value="4">4px</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Second row: Action buttons */}
          <div style={configButtonsStyle}>
            <button
              onClick={() => {
                // Reset to default: 5 rows, 3 columns
                setRows(5);
                setColumns(3);
                
                // Reset border settings to default
                setShowBorders(true);
                setBorderColor('#dee2e6');
                setBorderWidth(1);
                
                // Reset table data
                const newTableData: TableRowData[] = [];
                
                for (let i = 0; i < 5; i++) {
                  const cells: TableCellData[] = [];
                  
                  for (let j = 0; j < 3; j++) {
                    cells.push({
                      id: `cell-${i}-${j}`,
                      content: '',
                      imageUrl: undefined
                    });
                  }
                  
                  newTableData.push({
                    id: `row-${i}`,
                    cells
                  });
                }
                
                setTableData(newTableData);
              }}
              style={resetButtonStyle}
            >
              重置表格
            </button>
            
            
            <button
              onClick={() => {
                // Create a CSV representation of the table
                let csvContent = '';
                
                // Add headers
                const headers = [];
                for (let j = 0; j < columns; j++) {
                  headers.push(getColumnHeader(j));
                }
                csvContent += headers.join(',') + '\n';
                
                // Add data rows
                tableData.forEach(row => {
                  const rowData = row.cells.map(cell => {
                    // For simplicity, we only export text content
                    // Images would need to be handled differently
                    return `"${cell.content.replace(/"/g, '""')}"`;
                  });
                  csvContent += rowData.join(',') + '\n';
                });
                
                // Create blob and download
                const blob = new Blob(['\ufeff', csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'table_data.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              style={csvButtonStyle}
            >
              下载CSV
            </button>
            <button
              onClick={async () => {
                try {
                  const tableContainer = document.getElementById('printable-table-container');
                  if (tableContainer) {
                    const canvas = await html2canvas(tableContainer, {
                      scale: 2, // Higher quality
                      useCORS: true, // For images
                      logging: false // Reduce console output
                    });
                    
                    const link = document.createElement('a');
                    link.download = 'table-export.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                  } else {
                    alert('无法找到表格元素');
                  }
                } catch (error) {
                  console.error('导出图片时出错:', error);
                  alert('导出图片时出错，请查看控制台了解详情');
                }
              }}
              style={imageButtonStyle}
            >
              下载图片
            </button>
          </div>
        </div>
      </div>
      
      {/* Hidden printable table for export */}
      <div
        id="printable-table-container"
        style={hiddenPrintableTableStyle}
      >
        <table style={tableBaseStyle}>
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <th
                  key={colIndex}
                  style={{
                    ...printableTableHeaderCellStyle,
                    borderBottom: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                    borderRight: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                  }}
                >
                  {getColumnHeader(colIndex)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {printableTableData.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      ...printableTableDataCellStyle,
                      borderRight: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                      borderBottom: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                    }}
                  >
                    {cell.imageUrl ? (
                      <div>[图片]</div>
                    ) : cell.content ? (
                      <div>{cell.content}</div>
                    ) : (
                      <div></div> /* Truly blank for empty cells */
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table display */}
      <div
        id="table-container"
        style={tableContainerStyle}
      >
        <table style={tableBaseStyle}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      ...tableHeaderCellStyle,
                      borderBottom: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                      borderRight: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    style={{
                      ...tableDataCellStyle,
                      borderRight: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                      borderBottom: showBorders ? `${borderWidth}px solid ${borderColor}` : 'none',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageCropped={handleImageCropped}
      />
    </div>
  );
};

export default TableEditor;
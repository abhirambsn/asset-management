import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'

type StatsTableProps = {
  tableData: TableData[]
}

const StatsTable = ({tableData}: StatsTableProps) => {
  return (
    <Table>
        <TableBody>
          {tableData.map((row: TableData, index: number) => (
            <TableRow key={index}>
              <TableHead>{row.col}</TableHead>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  )
}

export default StatsTable
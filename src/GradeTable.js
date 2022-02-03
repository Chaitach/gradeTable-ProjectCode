import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button,} from "react-bootstrap";

const styles ={
    textCenter : {textAlign: 'center'},
    textRight : {textAlign: 'right'},
  
  }
  

function GradeTable({data, setsemesterdata}) {
const [dataRows, setDataRows] = useState();


useEffect(() => {
    const z = data.map((v,i)=>{

        return(
            <tr key={i}>
                
                <td style ={styles.textCenter}>{v.year}</td>
                <td style ={styles.textCenter}>{v.semester}</td>
                <td style ={styles.textCenter}>{v.subject}</td>
                <td style ={styles.textCenter}>{v.grade}</td>
            </tr>
        );
    });

    setDataRows(z);

    
},[data]);

const clearTable =() =>{
    setDataRows([]);
    setsemesterdata([]);
};

return (
    <Container>
      <Row>
        <Col>
        <h1>GradeTable</h1>
        </Col>
      <Col style ={styles.textRight}>
      <Button onClick={clearTable} variant="dark" >Clear
      </Button>
      </Col>
      </Row>

      <Table sstriped bordered hover>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        </Table>
        </Container>
);
}

export default GradeTable;
import { useRef, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import useLocalStorage from "react-localstorage-hook"
import data from "./data.json";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GradeTable from "./GradeTable";

function App() {
  const yearRef = useRef();
  const semesterRef = useRef();
  const subjectRef = useRef();
  const gradeRef = useRef();
  const [semesterdata, setsemesterdata] = useLocalStorage("semesterdata", [])

  const gradeList = [
    { id: "g01", name: 'A', gradepoint: 4 },
    { id: "g02", name: 'A-', gradepoint: 3.75 },
    { id: "g03", name: 'B+', gradepoint: 3.25 },
    { id: "g04", name: 'B', gradepoint: 3 },
    { id: "g05", name: 'B-', gradepoint: 2.75 },
    { id: "g06", name: 'C+', gradepoint: 2.25 },
    { id: "g07", name: 'C', gradepoint: 2 },
    { id: "g08", name: 'C-', gradepoint: 1.75 },
    { id: "g09", name: 'D', gradepoint: 1 },
    { id: "g010", name: 'F', gradepoint: 0 },
    { id: "g011", name: 'W', gradepoint: "" }
  ];

  // const overallGPA = {

  //     semester: 999999,
  //     year: 99999,
  //     subject: "ENG",
  //     credit: 0,
  //     grade: "A",
  //     gradepoint: 3,
  // }
  // semesterdata.push(overallGPA)

  const calculateTotalGPA = (data) => {
    console.log(data);
    let totalGradepoint = 0;
    let totalCredit = 0;
    data.forEach((subject) => {
      totalGradepoint += subject.gradepoint * subject.credit;
      totalCredit += subject.credit;
    });
    console.log(totalCredit)
    console.log(totalGradepoint)

    const GPA = totalGradepoint / totalCredit;
    console.log(GPA)
    return (Math.round(GPA * 100) / 100).toFixed(2);


  }

  const addsemestergrade = () => {
    const gid = gradeRef.current.value
    const grade = gradeList.find(e => e.id === gid)

    const sid = subjectRef.current.value
    const subject = data.curriculum.find(e => e.key === sid)
    if (hasSemesterexisted(semesterdata, semesterRef.current.value, yearRef.current.value)
    ) {
      var totalobject = {
        semester: semesterRef.current.value,
        year: yearRef.current.value,
        subject: "",
        credit: 0,
        grade: "",
        gradepoint: 0,
      }
      semesterdata.push(totalobject);

    }
    var itemobj = {
      semester: semesterRef.current.value,
      year: yearRef.current.value,
      subject: subject.name,
      credit: subject.credit,
      grade: grade.name,
      gradepoint: grade.gradepoint,
    };

    semesterdata.push(itemobj);

    const totalIndex = semesterdata.findIndex(e => e.semester === semesterRef.current.value && e.year === yearRef.current.value && e.subject === "")
    semesterdata[totalIndex].grade = calculateTotalGPA(semesterdata.filter(e => e.semester === semesterRef.current.value && e.year === yearRef.current.value))
    semesterdata.sort((a, b) => {
      return (a.year - b.year) + (a.semester - b.semester)
    })

    setsemesterdata([...semesterdata]);

  }

  const hasSemesterexisted = (semesterdata, semester, year) => {
    if (semester && year) {
      const semesterdetail = semesterdata.filter(e => e.semester === semester && e.year === year);
      if (semesterdetail.length > 0) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }




  const options = gradeList.map(v => {
    return <option value={v.id}>{v.name}</option>
  })

  const options1 = data.curriculum.map(v => {
    return <option value={v.key}>{v.name}</option>
  })



  return (
    <Container>
      <Row>
        <Col xs={5} style={{ backgrondColor: '#eaeaea' }}>
          <Form>
            <Form.Group className="mb-3" controlId="semester">
              <Form.Label>Semester</Form.Label>
              <Form.Select aria-label="Default select example" ref={semesterRef}>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Select aria-label="Default select example" ref={yearRef}>
                <option selected value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Subject">
              <Form.Label>Subject</Form.Label>
              <Form.Select aria-label="Default select example" ref={subjectRef}
              > {options1}</Form.Select>  </Form.Group>


            <Form.Group className="mb-3" controlId="year">
              <Form.Label>Grade</Form.Label>
              <Form.Select aria-label="Default select example" ref={gradeRef}
              > {options}</Form.Select>  </Form.Group>


            <Button variant="outline-dark" onClick={addsemestergrade}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <GradeTable data={semesterdata} setsemesterdata={setsemesterdata} />
        </Col>
      </Row>
    </Container>
  );
}
export default App;

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.session import SessionLocal
from models.report import Report
from schemas.report import ReportCreate, ReportResponse, ReportUpdate
from auth import verify_admin
from fastapi import Header, HTTPException, status



router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/reports/", response_model=ReportResponse)
def create_report(report: ReportCreate, db: Session = Depends(get_db)):
    db_report = Report(
        title=report.title,
        description=report.description,
        building_id=report.building_id
    )

    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return db_report

@router.patch("/reports/{report_id}/status", response_model=ReportResponse)
def update_status(
    report_id: int,
    update: ReportUpdate,
    db: Session = Depends(get_db),
    _: None = Depends(verify_admin)
):
    report = db.query(Report).filter(Report.id == report_id).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    report.status = update.status
    db.commit()
    db.refresh(report)

    return report

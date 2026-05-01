from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from database.session import SessionLocal
from models.report import Report
from database.session import get_db
from schemas.report import ReportCreate, ReportResponse, ReportUpdate
from auth import verify_admin




router = APIRouter()

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

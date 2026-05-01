from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from database.session import get_db
from models.building import Building
from schemas.building import BuildingCreate, BuildingOut, BuildingUpdate
from auth import verify_admin

router = APIRouter(prefix="/buildings", tags=["buildings"])

@router.get("/", response_model = list[BuildingOut])
def get_buildings(q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Building)

    if q:
        query = query.filter(Building.name.ilike(f"%{q}%"))

    return query.all()

@router.get("/{building_id}", response_model = BuildingOut)
def get_building(building_id: int, db: Session = Depends(get_db)):
    return db.query(Building).filter(Building.id == building_id).first()

@router.post("/", response_model = BuildingOut)
def create_building(
    building: BuildingCreate,
    db: Session = Depends(get_db),
    _: None = Depends(verify_admin)
):
    db_building = Building(**building.model_dump())
    db.add(db_building)
    db.commit()
    db.refresh(db_building)
    return db_building

@router.patch("/{building_id}", response_model=BuildingOut)
def update_building(
    building_id: int,
    data: BuildingUpdate,
    db: Session = Depends(get_db),
    _: None = Depends(verify_admin)
):
    building = db.query(Building).filter(Building.id == building_id).first()

    if not building:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Building not found"
        )

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(building, key, value)

    db.commit()
    db.refresh(building)

    return building




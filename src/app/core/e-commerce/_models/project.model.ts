import { BaseModel } from '../../_base/crud';

export class ProjectModel  extends BaseModel {
  TestingType: any;
  deleiveryDate(deleiveryDate: any): any {
	  throw new Error('Method not implemented.');
  }
  dateOfDeleivery(dateOfDeleivery: any): any {
	  throw new Error('Method not implemented.');
  }
  id: number;
  ProjectName: string;
  ClientName: string;
  DeleiveryDate: string;
  type: string; 

  clear() {
  
    this.ProjectName = '';
    this.ClientName = '';
    this.DeleiveryDate = '';
    this.type = "";
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import axios from "axios";
import * as FormData from "form-data";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.css'],
  animations: [trigger('diseaseState', [
    state('neutral', style({
      'background-color': 'black'
    })),
    state('Glioma', style({
      'background-color': 'black',
      'transform': 'translateX(-500px)',
    })),
    state('Meningioma', style({
      'background-color': 'black',
      'transform': 'translateX(-500px)',
    })),
    state('Pituitary', style({
      'background-color': 'black',
      'transform': 'translateX(-500px)',
    })),
    state('No Tumour', style({
      'background-color': 'black',
      'transform': 'translateX(-500px)',
    })),
    transition('neutral <=> *', animate(700))
  ]),
    trigger('divState', [
      state('needed', style(
        {'transform': 'translate(200px,0px)', 'opacity': '1'})),
      state('notNeeded', style(
        {'transform': 'translate(200px, -500px)', 'opacity': '0'})),
      transition('notNeeded <=> needed', animate(1000))])]
})
export class WebpageComponent implements OnInit {
  @ViewChild('imgTag', {static: true}) imgTag: ElementRef<HTMLImageElement>;
  @ViewChild('inputTag', {static: true}) inputTag: ElementRef<HTMLInputElement>;

  currentPara: string
  currentTreatment: string[]
  noneDesc: string = 'No Diagnosis found.'
  GliomaDesc: string = "Gliomas: These are the most common type of brain tumors, accounting for about 30% of all brain tumors. Gliomas originate from the supportive cells of the brain called glial cells, which help to nourish and protect the neurons. Gliomas can be further divided into subtypes, including astrocytomas, oligodendrogliomas, and ependymomas."
  GliomaTreatment = ['Surgery: Surgery is usually the first-line treatment for glioma, and it involves removing as much of the tumor as possible. The extent of the surgery depends on the size, location, and grade of the tumor.', 'Radiation therapy: Radiation therapy uses high-energy rays to destroy cancer cells. It is often used after surgery to kill any remaining cancer cells or as the primary treatment for gliomas that cannot be removed with surgery.', 'Chemotherapy: Chemotherapy involves using drugs to kill cancer cells. It can be given orally, intravenously, or directly into the brain through a catheter.']
  MeningiomaDesc: string = 'Meningiomas: These are non-cancerous tumors that arise from the meninges, the protective layers of tissue that surround the brain and spinal cord. Meningiomas can grow large and cause symptoms by pressing on the brain tissue.'
  MeninGiomaTreatment: string[] = ['Observation: If the meningioma is small and not causing any symptoms, it may be monitored over time with regular imaging tests to see if it grows or changes.', 'Surgery: Surgery is often the first-line treatment for meningioma, especially if the tumor is causing symptoms or is located in a critical area of the brain. The goal of surgery is to remove as much of the tumor as possible while preserving brain function.', 'Stereotactic radiosurgery: Stereotactic radiosurgery is a type of radiation therapy that delivers a high dose of radiation to a specific area of the brain. It is often used to treat small meningiomas that are not amenable to surgery.']
  PituitaryDesc: string = 'Pituitary adenomas: These are tumors that arise from the pituitary gland, a small gland located at the base of the brain. Pituitary adenomas can cause hormonal imbalances by overproducing or underproducing certain hormones.'
  PituitaryTreatment: string[] = ['Medications: Medications may be prescribed to regulate the production of hormones in the pituitary gland. For example, dopamine agonists may be prescribed for the treatment of prolactinomas, which are tumors that produce too much prolactin.', 'Surgery: Surgery may be necessary to remove tumors or other abnormalities in the pituitary gland. Endoscopic transsphenoidal surgery is a minimally invasive procedure that involves removing the tumor through the nose and sinuses.', 'Hormone replacement therapy: Hormone replacement therapy may be necessary for patients with pituitary disorders that result in hormone deficiencies. For example, patients with hypopituitarism may need to take hormones to replace those that are not being produced by the pituitary gland.']
  states: string[] = ['neutral',
    'Glioma',
    'Meningioma',
    'Pituitary',
    'No Tumour']
  cancerState: string = this.states[0];
  divStage = 'notNeeded'

  uploadPredict = async () => {
    const fd = new FormData()
    fd.append("file", this.inputTag.nativeElement.files[0])
    await axios.post("http://127.0.0.1:5000/predict", fd).then(data => {
      this.cancerState = data.data
      if (this.cancerState !== 'neutral') {
        this.divStage = 'needed'
        if (this.cancerState === 'Glioma') {
          this.currentPara = this.GliomaDesc
          this.currentTreatment = this.GliomaTreatment
        } else if (this.cancerState === 'Meningioma') {
          this.currentPara = this.MeningiomaDesc
          this.currentTreatment = this.MeninGiomaTreatment
        } else if (this.cancerState === 'Pituitary') {
          this.currentPara = this.PituitaryDesc
          this.currentTreatment = this.PituitaryTreatment
        } else {
          this.currentPara = this.noneDesc
        }
      }
    })
  }
  reset(){
  this.cancerState= this.states[0];
  this.divStage = 'notNeeded'
  }
  ngOnInit() {
    console.log(this.cancerState)
    this.inputTag.nativeElement.onchange = () => {
      this.imgTag.nativeElement.src = URL.createObjectURL(this.inputTag.nativeElement.files[0])
    }
  }
}

import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MinMaxDirective } from './min-max.directive';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { TranslocoRootModule } from './transloco-root.module';

/** @title Disabled select */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    MinMaxDirective,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMaskDirective,
    TranslocoRootModule,
  ],
  providers: [
    provideNgxMask(),
  ],
})
export class AppComponent {
  minGold: any
  str1: any
  str2: any
  str1gr: any
  str2gr: any
  str1de: any
  str2de: any
  str1grde: any
  str2grde: any
  agl1: any
  agl2: any
  agl1gr: any
  agl2gr: any
  agl1de: any
  agl2de: any
  agl1grde: any
  agl2grde: any
  sta1: any
  sta2: any
  sta1gr: any
  sta2gr: any
  sta1de: any
  sta2de: any
  sta1grde: any
  sta2grde: any
  int1: any
  int2: any
  int1gr: any
  int2gr: any
  int1de: any
  int2de: any
  int1grde: any
  int2grde: any
  cha1: any
  cha2: any
  cha1gr: any
  cha2gr: any
  cha1de: any
  cha2de: any
  cha1grde: any
  cha2grde: any
  luc1: any
  luc2: any
  luc1gr: any
  luc2gr: any
  luc1de: any
  luc2de: any
  luc1grde: any
  luc2grde: any
  degrChance1: any
  degrChance2: any
  degrPer1: any
  degrPer2: any
  plusRar1: any
  plusRar2: any
  successChance: any
  UpgrChance1: any
  UpgrChance2: any
  upgrPer1: any
  upgrPer2: any
  primaryHouse: string = ''
  secondaryHouse: string = ''
  configForm: FormGroup;
  firstParentForm: FormGroup;
  secondParentForm: FormGroup;
  constructor (private _fb: FormBuilder){
    this.configForm = _fb.group({
      parentType: ['option1'],
      period: ['10'],
      statsNumber: ['1'],
      additionalGold: [0],
    });
    this.firstParentForm = _fb.group({
      house: ["H'Dronners"],
      rarity: [4],
      grade: [0],
      power: [50],
      agility: [50],
      stamina: [50],
      intellegence: [50],
      charisma: [50],
      luck: [50],
      blackRock: [10],
    });
    this.secondParentForm = _fb.group({
      house: ["H'Dronners"],
      rarity: [4],
      grade: [0],
      power: [50],
      agility: [50],
      stamina: [50],
      intellegence: [50],
      charisma: [50],
      luck: [50],
      blackRock: [10],
    });
    this.configForm.controls['parentType'].valueChanges.subscribe(t => {
      if(this.configForm.value.parentType !== 'option1'){
        this.configForm.patchValue({period: '60'}, { emitEvent: false })
        this.firstParentForm.patchValue({blackRock: '60'}, { emitEvent: false })
        this.secondParentForm.patchValue({blackRock: '60'}, { emitEvent: false })
      }
      setTimeout(() => this.calculateStats(), 100)
    })
    this.configForm.controls['period'].valueChanges.subscribe(t => {
        this.firstParentForm.patchValue({blackRock: t}, { emitEvent: false })
        this.secondParentForm.patchValue({blackRock: t}, { emitEvent: false })
        setTimeout(() => this.calculateStats(), 100)
    })
    this.configForm.controls['additionalGold'].valueChanges.subscribe(t => {
      setTimeout(() => this.calculateStats(), 100)
  })
  this.configForm.controls['statsNumber'].valueChanges.subscribe(t => {
    setTimeout(() => this.calculateStats(), 100)
   
})
    this.firstParentForm.valueChanges.subscribe(t => this.calculateStats())
    this.secondParentForm.valueChanges.subscribe(t => this.calculateStats())
    this.calculateStats()
  }

  calculateStats(){
    console.log('aaa')
    let par1 = this.firstParentForm.value
    let par2 = this.secondParentForm.value
    let conf = this.configForm.value
    this.minGold = conf['parentType'] == 'option1' ? 3000 : 10000
    let D = Math.abs(+par1['grade']/4 + +par1['rarity'] - +par2['grade']/4 - +par2['rarity'])
    let GR = (+par1['grade']/2 + +par1['rarity'] + +par2['grade']/2 + +par2['rarity'])/2
    let CH = ((+par1['charisma'] + +par2['charisma'])/2 - 50)/1.5
    let BR = +par1['blackRock'] + +par2['blackRock']
    let CR = +conf['statsNumber']
    let SP = conf['additionalGold']/1000
    this.UpgrChance1 = Math.min(par1['charisma'], par2['charisma']) / 2 + CR * 2
    this.UpgrChance2 = Math.max(par1['charisma'], par2['charisma']) / 2 + CR * 2
    this.upgrPer1 = Math.min(par1['intellegence'], par2['intellegence']) / 5 + CR * 3
    this.upgrPer2 = Math.max(par1['intellegence'], par2['intellegence']) / 5 + CR * 3
    let DEC = 0
    if(par1['house'] !== par2['house']){
      if(conf['parentType'] == 'option1' && par2['house'] == "H'Dronners"){
        this.primaryHouse = "H'Dronners"
        this.secondaryHouse = ''
        DEC = 20
      } else if(conf['parentType'] == 'option1' && par2['house'] == 'Akreitess'){
        DEC = 0
      } else {
        this.primaryHouse = par1['charisma'] > par2['charisma'] ? par1['house'] : par2['house']
        this.secondaryHouse = par1['charisma'] > par2['charisma'] ? par2['house'] : par1['house']
        DEC = 40
      }
    } else {
      this.primaryHouse = par1['house']
      this.secondaryHouse = ''
    }
    if(par1['rarity'] !== par2['rarity']){
      if(conf['parentType'] == 'option1' && par2['house'] == 'Korrtess'){

      } else if(conf['parentType'] == 'option1' && par2['house'] == "H'Dronners"){
        DEC = DEC + (Math.abs(par1['rarity'] - par2['rarity']) * 25) / 2
      } else {
        DEC = DEC + Math.abs(par1['rarity'] - par2['rarity']) * 25
      }
    } 
    this.degrChance1 = Math.min(Math.max(100 + DEC - Math.min(par1['charisma'], par2['charisma']) / 2 - BR - CR * 7, 0), 100)
    this.degrChance2 = Math.min(Math.max(100 + DEC - Math.max(par1['charisma'], par2['charisma']) / 2 - BR - CR * 7, 0), 100)
    this.degrPer1 = 40 - Math.max(par1['intellegence'], par2['intellegence']) / 5 - CR*3
    this.degrPer2 = 40 - Math.min(par1['intellegence'], par2['intellegence']) / 5 - CR*3
    this.plusRar1 = Math.floor((SP*CR + CH/7) * 100) / 100
    this.plusRar2 = Math.floor((SP + CH/7) * 100) / 100
    this.successChance = Math.floor(Math.min(Math.max(100 - D * 20 - GR * 15 + CH + SP * 7 + BR/2, 3), 90) * 100) / 100
    this.str1 = Math.min(Math.max(Math.floor(Math.min(par1['power'], par2['power'])), 0), 100)
    this.str2 = Math.min(Math.max(Math.floor(Math.max(par1['power'], par2['power'])), 0), 100)
    this.str1gr = Math.min(Math.max(Math.floor(Math.min(par1['power'], par2['power']) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.str2gr = Math.min(Math.max(Math.floor(Math.max(par1['power'], par2['power']) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.str1de = Math.min(Math.max(Math.floor(Math.min(par1['power'], par2['power']) * (1 - this.degrPer2 / 100)), 0), 100)
    this.str2de = Math.min(Math.max(Math.floor(Math.max(par1['power'], par2['power']) * (1 - this.degrPer1 / 100)), 0), 100)
    this.str1grde = Math.min(Math.max(Math.floor(Math.min(par1['power'], par2['power']) * (1 - this.degrPer2 / 100) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.str2grde = Math.min(Math.max(Math.floor(Math.max(par1['power'], par2['power']) * (1 - this.degrPer1 / 100) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.agl1 = Math.min(Math.max(Math.floor(Math.min(par1['agility'], par2['agility'])), 0), 100)
    this.agl2 = Math.min(Math.max(Math.floor(Math.max(par1['agility'], par2['agility'])), 0), 100)
    this.agl1gr = Math.min(Math.max(Math.floor(Math.min(par1['agility'], par2['agility']) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.agl2gr = Math.min(Math.max(Math.floor(Math.max(par1['agility'], par2['agility']) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.agl1de =Math.min(Math.max(Math.floor(Math.min(par1['agility'], par2['agility']) * (1 - this.degrPer2 / 100)), 0), 100)
    this.agl2de = Math.min(Math.max(Math.floor(Math.max(par1['agility'], par2['agility']) * (1 - this.degrPer1 / 100)), 0), 100)
    this.agl1grde = Math.min(Math.max(Math.floor(Math.min(par1['agility'], par2['agility']) * (1 - this.degrPer2 / 100) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.agl2grde = Math.min(Math.max(Math.floor(Math.max(par1['agility'], par2['agility']) * (1 - this.degrPer1 / 100) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.sta1 = Math.min(Math.max(Math.floor(Math.min(par1['stamina'], par2['stamina'])), 0), 100)
    this.sta2 = Math.min(Math.max(Math.floor(Math.max(par1['stamina'], par2['stamina'])), 0), 100)
    this.sta1gr = Math.min(Math.max(Math.floor(Math.min(par1['stamina'], par2['stamina'])* (1 + this.upgrPer1 / 100)), 0), 100)
    this.sta2gr = Math.min(Math.max(Math.floor(Math.max(par1['stamina'], par2['stamina']) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.sta1de = Math.min(Math.max(Math.floor(Math.min(par1['stamina'], par2['stamina']) * (1 - this.degrPer2 / 100)), 0), 100)
    this.sta2de = Math.min(Math.max(Math.floor(Math.max(par1['stamina'], par2['stamina']) * (1 - this.degrPer1 / 100)), 0), 100)
    this.sta1grde = Math.min(Math.max(Math.floor(Math.min(par1['agility'], par2['agility']) * (1 - this.degrPer2 / 100) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.sta2grde = Math.min(Math.max(Math.floor(Math.max(par1['agility'], par2['agility']) * (1 - this.degrPer1 / 100) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.int1 = Math.min(Math.max(Math.floor(Math.min(par1['intellegence'], par2['intellegence'])), 0), 100)
    this.int2 = Math.min(Math.max(Math.floor(Math.max(par1['intellegence'], par2['intellegence'])), 0), 100)
    this.int1gr = Math.min(Math.max(Math.floor(Math.min(par1['intellegence'], par2['intellegence']) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.int2gr = Math.min(Math.max(Math.floor(Math.max(par1['intellegence'], par2['intellegence']) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.int1de = Math.min(Math.max(Math.floor(Math.min(par1['intellegence'], par2['intellegence']) * (1 - this.degrPer2 / 100)), 0), 100)
    this.int2de = Math.min(Math.max(Math.floor(Math.max(par1['intellegence'], par2['intellegence']) * (1 - this.degrPer1 / 100)), 0), 100)
    this.int1grde = Math.min(Math.max(Math.floor(Math.min(par1['intellegence'], par2['intellegence']) * (1 - this.degrPer2 / 100) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.int2grde = Math.min(Math.max(Math.floor(Math.max(par1['intellegence'], par2['intellegence']) * (1 - this.degrPer1 / 100) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.cha1 = Math.min(Math.max(Math.floor(Math.min(par1['charisma'], par2['charisma'])), 0), 100)
    this.cha2 = Math.min(Math.max(Math.floor(Math.max(par1['charisma'], par2['charisma'])), 0), 100)
    this.cha1gr = Math.min(Math.max(Math.floor(Math.min(par1['charisma'], par2['charisma']) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.cha2gr = Math.min(Math.max(Math.floor(Math.max(par1['charisma'], par2['charisma']) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.cha1de = Math.min(Math.max(Math.floor(Math.min(par1['charisma'], par2['charisma']) * (1 - this.degrPer2 / 100)), 0), 100)
    this.cha2de = Math.min(Math.max(Math.floor(Math.max(par1['charisma'], par2['charisma']) * (1 - this.degrPer1 / 100)), 0), 100)
    this.cha1grde = Math.min(Math.max(Math.floor(Math.min(par1['intellegence'], par2['intellegence']) * (1 - this.degrPer2 / 100) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.cha2grde = Math.min(Math.max(Math.floor(Math.max(par1['intellegence'], par2['intellegence']) * (1 - this.degrPer1 / 100) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.luc1 = Math.min(Math.max(Math.floor(Math.min(par1['luck'], par2['luck'])), 0), 100)
    this.luc2 = Math.min(Math.max(Math.floor(Math.max(par1['luck'], par2['luck'])), 0), 100)
    this.luc1gr = Math.min(Math.max(Math.floor(Math.min(par1['luck'], par2['luck']) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.luc2gr = Math.min(Math.max(Math.floor(Math.max(par1['luck'], par2['luck']) * (1 + this.upgrPer2 / 100)), 0), 100)
    this.luc1de = Math.min(Math.max(Math.floor(Math.min(par1['luck'], par2['luck']) * (1 - this.degrPer2 / 100)), 0), 100)
    this.luc2de = Math.min(Math.max(Math.floor(Math.max(par1['luck'], par2['luck']) * (1 - this.degrPer1 / 100)), 0), 100)
    this.luc1grde = Math.min(Math.max(Math.floor(Math.min(par1['luck'], par2['luck']) * (1 - this.degrPer2 / 100) * (1 + this.upgrPer1 / 100)), 0), 100)
    this.luc2grde = Math.min(Math.max(Math.floor(Math.max(par1['luck'], par2['luck']) * (1 - this.degrPer1 / 100) * (1 + this.upgrPer2 / 100)), 0), 100)
  }
}
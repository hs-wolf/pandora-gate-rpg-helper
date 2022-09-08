/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../src/app/auth/authController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CharactersController } from './../src/app/characters/charactersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ElementsController } from './../src/app/elements/elementsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { JobsController } from './../src/app/jobs/jobsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LocationsController } from './../src/app/locations/locationsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NpcsController } from './../src/app/npcs/npcsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../src/app/users/usersController';
import { expressAuthentication } from './../src/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserRegisterBody": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Element": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "double": {"dataType":"string","required":true},
            "triple": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "image": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Job": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "tier": {"dataType":"double","required":true},
            "img": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicData": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"gold":{"dataType":"double","required":true},"maxHunger":{"dataType":"double","required":true},"currentHunger":{"dataType":"double","required":true},"skillRegen":{"dataType":"double","required":true},"enhancements":{"dataType":"double","required":true},"jp":{"dataType":"double","required":true},"next":{"dataType":"double","required":true},"exp":{"dataType":"double","required":true},"level":{"dataType":"double","required":true},"maxSP":{"dataType":"double","required":true},"currentSP":{"dataType":"double","required":true},"maxMP":{"dataType":"double","required":true},"currentMP":{"dataType":"double","required":true},"maxHP":{"dataType":"double","required":true},"currentHP":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Attributes": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"luck":{"dataType":"double","required":true},"spirit":{"dataType":"double","required":true},"vitality":{"dataType":"double","required":true},"dexterity":{"dataType":"double","required":true},"agility":{"dataType":"double","required":true},"strength":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicStats": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"magicalDice":{"dataType":"double","required":true},"magicalDefense":{"dataType":"double","required":true},"physicalDice":{"dataType":"double","required":true},"physicalDefense":{"dataType":"double","required":true},"critical":{"dataType":"double","required":true},"move":{"dataType":"double","required":true},"dodge":{"dataType":"double","required":true},"initiative":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ranges": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"fireWeaponRange":{"dataType":"double","required":true},"rangedRange":{"dataType":"double","required":true},"meleeRange":{"dataType":"double","required":true},"unarmedRange":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Accuracies": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"fireWeaponAccuracy":{"dataType":"double","required":true},"rangedAccuracy":{"dataType":"double","required":true},"meleeAccuracy":{"dataType":"double","required":true},"unarmedAccuracy":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PhysicalBonus": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"fireWeaponBonus":{"dataType":"double","required":true},"rangedBonus":{"dataType":"double","required":true},"meleeBonus":{"dataType":"double","required":true},"unarmedBonus":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MagicalBonus": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"astralBonus":{"dataType":"double","required":true},"windBonus":{"dataType":"double","required":true},"thunderBonus":{"dataType":"double","required":true},"darkBonus":{"dataType":"double","required":true},"earthBonus":{"dataType":"double","required":true},"soulBonus":{"dataType":"double","required":true},"sunBonus":{"dataType":"double","required":true},"natureBonus":{"dataType":"double","required":true},"magickBonus":{"dataType":"double","required":true},"lightBonus":{"dataType":"double","required":true},"moonBonus":{"dataType":"double","required":true},"iceBonus":{"dataType":"double","required":true},"fireBonus":{"dataType":"double","required":true},"etherealBonus":{"dataType":"double","required":true},"waterBonus":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Expertises": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"expertiseRelaxation":{"dataType":"double","required":true},"expertiseChemistry":{"dataType":"double","required":true},"expertiseSpecialWeapon":{"dataType":"double","required":true},"expertiseSteal":{"dataType":"double","required":true},"expertiseFaith":{"dataType":"double","required":true},"expertiseAstronomy":{"dataType":"double","required":true},"expertiseStunt":{"dataType":"double","required":true},"expertiseSynergy":{"dataType":"double","required":true},"expertisePVP":{"dataType":"double","required":true},"expertiseMVP":{"dataType":"double","required":true},"expertiseCombo":{"dataType":"double","required":true},"expertiseTactic":{"dataType":"double","required":true},"expertiseForecastWeather":{"dataType":"double","required":true},"expertisePerception":{"dataType":"double","required":true},"expertiseNegotiate":{"dataType":"double","required":true},"expertiseMysticism":{"dataType":"double","required":true},"expertiseCurse":{"dataType":"double","required":true},"expertiseLanguage":{"dataType":"double","required":true},"expertiseIntimidate":{"dataType":"double","required":true},"expertiseInterrogate":{"dataType":"double","required":true},"expertiseInterpretDreams":{"dataType":"double","required":true},"expertiseAstralElement":{"dataType":"double","required":true},"expertiseWindElement":{"dataType":"double","required":true},"expertiseThunderElement":{"dataType":"double","required":true},"expertiseDarknessElement":{"dataType":"double","required":true},"expertiseEarthElement":{"dataType":"double","required":true},"expertiseSoulElement":{"dataType":"double","required":true},"expertiseSunElement":{"dataType":"double","required":true},"expertiseNatureElement":{"dataType":"double","required":true},"expertiseMagickElement":{"dataType":"double","required":true},"expertiseLightElement":{"dataType":"double","required":true},"expertiseMoonElement":{"dataType":"double","required":true},"expertiseIceElement":{"dataType":"double","required":true},"expertiseFireElement":{"dataType":"double","required":true},"expertiseEtherealElement":{"dataType":"double","required":true},"expertiseWaterElement":{"dataType":"double","required":true},"expertiseMagicDefense":{"dataType":"double","required":true},"expertiseConjuration":{"dataType":"double","required":true},"expertiseBluff":{"dataType":"double","required":true},"expertiseAid":{"dataType":"double","required":true},"expertiseMagickFind":{"dataType":"double","required":true},"expertisePlayCalculate":{"dataType":"double","required":true},"expertiseCritical":{"dataType":"double","required":true},"expertiseSurvival":{"dataType":"double","required":true},"expertiseLeadership":{"dataType":"double","required":true},"expertisePhysicalDefense":{"dataType":"double","required":true},"expertiseCharisma":{"dataType":"double","required":true},"expertiseFirstAid":{"dataType":"double","required":true},"expertisePrepareTrap":{"dataType":"double","required":true},"expertisePilot":{"dataType":"double","required":true},"expertiseSwim":{"dataType":"double","required":true},"expertiseMakeBoat":{"dataType":"double","required":true},"expertiseClimb":{"dataType":"double","required":true},"expertiseThrowObject":{"dataType":"double","required":true},"expertiseMasonry":{"dataType":"double","required":true},"expertiseFireGuns":{"dataType":"double","required":true},"expertiseRangedWeapons":{"dataType":"double","required":true},"expertiseAgriculture":{"dataType":"double","required":true},"expertiseJump":{"dataType":"double","required":true},"expertiseEscape":{"dataType":"double","required":true},"expertiseDodge":{"dataType":"double","required":true},"expertiseHide":{"dataType":"double","required":true},"expertiseDualWield":{"dataType":"double","required":true},"expertiseDisguise":{"dataType":"double","required":true},"expertiseMislead":{"dataType":"double","required":true},"expertiseTrack":{"dataType":"double","required":true},"expertiseMount":{"dataType":"double","required":true},"expertiseMine":{"dataType":"double","required":true},"expertiseUnarmedFight":{"dataType":"double","required":true},"expertiseImmobilize":{"dataType":"double","required":true},"expertiseForge":{"dataType":"double","required":true},"expertiseWillpower":{"dataType":"double","required":true},"expertiseMechanicalWeapons":{"dataType":"double","required":true},"expertiseMeleeWeapons":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FixedOperators": {
        "dataType": "refEnum",
        "enums": ["SUM","SUBTRACTION","MULTIPLICATION","DIVISION"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FixedEffect": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"double","required":true},"operator":{"ref":"FixedOperators","required":true},"target":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EffectFieldsList": {
        "dataType": "refEnum",
        "enums": ["currentHP","maxHP","currentMP","maxMP","currentSP","maxSP","level","strength","agility","dexterity","vitality","spirit","luck","initiative","dodge","move","critical","physicalDefense","physicalDice","magicalDefense","magicalDice","unarmedRange","meleeRange","rangedRange","fireWeaponRange","unarmedAccuracy","meleeAccuracy","rangedAccuracy","fireWeaponAccuracy","unarmedBonus","meleeBonus","rangedBonus","fireWeaponBonus","waterBonus","etherealBonus","fireBonus","iceBonus","moonBonus","lightBonus","magickBonus","natureBonus","sunBonus","soulBonus","earthBonus","darkBonus","thunderBonus","windBonus","astralBonus","expertiseMeleeWeapons","expertiseMechanicalWeapons","expertiseWillpower","expertiseForge","expertiseImmobilize","expertiseUnarmedFight","expertiseMine","expertiseMount","expertiseTrack","expertiseMislead","expertiseDisguise","expertiseDualWield","expertiseHide","expertiseDodge","expertiseEscape","expertiseJump","expertiseAgriculture","expertiseRangedWeapons","expertiseFireGuns","expertiseMasonry","expertiseThrowObject","expertiseClimb","expertiseMakeBoat","expertiseSwim","expertisePilot","expertisePrepareTrap","expertiseFirstAid","expertiseCharisma","expertisePhysicalDefense","expertiseLeadership","expertiseSurvival","expertiseCritical","expertisePlayCalculate","expertiseMagickFind","expertiseAid","expertiseBluff","expertiseConjuration","expertiseMagicDefense","expertiseWaterElement","expertiseEtherealElement","expertiseFireElement","expertiseIceElement","expertiseMoonElement","expertiseLightElement","expertiseMagickElement","expertiseNatureElement","expertiseSunElement","expertiseSoulElement","expertiseEarthElement","expertiseDarknessElement","expertiseThunderElement","expertiseWindElement","expertiseAstralElement","expertiseInterpretDreams","expertiseInterrogate","expertiseIntimidate","expertiseLanguage","expertiseCurse","expertiseMysticism","expertiseNegotiate","expertisePerception","expertiseForecastWeather","expertiseTactic","expertiseCombo","expertiseMVP","expertisePVP","expertiseSynergy","expertiseStunt","expertiseAstronomy","expertiseFaith","expertiseSteal","expertiseSpecialWeapon","expertiseChemistry","expertiseRelaxation"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinkedOperators": {
        "dataType": "refEnum",
        "enums": ["MULTIPLICATION","DIVISION"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinkedEffect": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"double","required":true},"fieldOperator":{"ref":"LinkedOperators","required":true},"field":{"ref":"EffectFieldsList","required":true},"targetOperator":{"ref":"FixedOperators","required":true},"target":{"ref":"EffectFieldsList","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PercentageOperators": {
        "dataType": "refEnum",
        "enums": ["SUM","SUBTRACTION"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PercentageEffect": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"double","required":true},"operator":{"ref":"PercentageOperators","required":true},"target":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Character": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "ownerId": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "guild": {"dataType":"string","required":true},
            "elements": {"dataType":"array","array":{"dataType":"refObject","ref":"Element"},"required":true},
            "jobs": {"dataType":"array","array":{"dataType":"refObject","ref":"Job"},"required":true},
            "basicData": {"ref":"BasicData","required":true},
            "attributes": {"ref":"Attributes","required":true},
            "basicStats": {"ref":"BasicStats","required":true},
            "ranges": {"ref":"Ranges","required":true},
            "accuracies": {"ref":"Accuracies","required":true},
            "physicalBonus": {"ref":"PhysicalBonus","required":true},
            "magicalBonus": {"ref":"MagicalBonus","required":true},
            "expertises": {"ref":"Expertises","required":true},
            "fixedEffects": {"dataType":"array","array":{"dataType":"refAlias","ref":"FixedEffect"},"required":true},
            "linkedEffects": {"dataType":"array","array":{"dataType":"refAlias","ref":"LinkedEffect"},"required":true},
            "percentageEffects": {"dataType":"array","array":{"dataType":"refAlias","ref":"PercentageEffect"},"required":true},
            "fixedFormulas": {"dataType":"array","array":{"dataType":"refAlias","ref":"FixedEffect"},"required":true},
            "linkedFormulas": {"dataType":"array","array":{"dataType":"refAlias","ref":"LinkedEffect"},"required":true},
            "percentageFormulas": {"dataType":"array","array":{"dataType":"refAlias","ref":"PercentageEffect"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_Character.ownerId-or-name__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"ownerId":{"dataType":"string"},"name":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CharacterCreateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Pick_Character.ownerId-or-name__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_Character.id-or-ownerId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"guild":{"dataType":"string"},"elements":{"dataType":"array","array":{"dataType":"refObject","ref":"Element"}},"jobs":{"dataType":"array","array":{"dataType":"refObject","ref":"Job"}},"basicData":{"ref":"BasicData"},"attributes":{"ref":"Attributes"},"basicStats":{"ref":"BasicStats"},"ranges":{"ref":"Ranges"},"accuracies":{"ref":"Accuracies"},"physicalBonus":{"ref":"PhysicalBonus"},"magicalBonus":{"ref":"MagicalBonus"},"expertises":{"ref":"Expertises"},"fixedEffects":{"dataType":"array","array":{"dataType":"refAlias","ref":"FixedEffect"}},"linkedEffects":{"dataType":"array","array":{"dataType":"refAlias","ref":"LinkedEffect"}},"percentageEffects":{"dataType":"array","array":{"dataType":"refAlias","ref":"PercentageEffect"}},"fixedFormulas":{"dataType":"array","array":{"dataType":"refAlias","ref":"FixedEffect"}},"linkedFormulas":{"dataType":"array","array":{"dataType":"refAlias","ref":"LinkedEffect"}},"percentageFormulas":{"dataType":"array","array":{"dataType":"refAlias","ref":"PercentageEffect"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CharacterUpdateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_Character.id-or-ownerId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_Element.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"double":{"dataType":"string"},"triple":{"dataType":"string"},"description":{"dataType":"string"},"image":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ElementCreateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_Element.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ElementUpdateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_Element.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_Job.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"description":{"dataType":"string"},"tier":{"dataType":"double"},"img":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JobUpdateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_Job.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocationTypes": {
        "dataType": "refEnum",
        "enums": ["CONTINENT","REALM","CITY","VILLAGE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Location": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "type": {"ref":"LocationTypes","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "img": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_Location.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"description":{"dataType":"string"},"img":{"dataType":"string"},"type":{"ref":"LocationTypes"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocationUpdateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_Location.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Npc": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "img": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_Npc.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"description":{"dataType":"string"},"img":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NpcUpdateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_Npc.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRoles": {
        "dataType": "refEnum",
        "enums": ["PLAYER","MASTER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "role": {"ref":"UserRoles","required":true},
            "name": {"dataType":"string","required":true},
            "picture": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Omit_User.id-or-role__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"picture":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserUpdateBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Omit_User.id-or-role__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.userRegister)),

            function AuthController_userRegister(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"UserRegisterBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.userRegister.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/characters/users/:userId',
            ...(fetchMiddlewares<RequestHandler>(CharactersController)),
            ...(fetchMiddlewares<RequestHandler>(CharactersController.prototype.getCharactersByUserId)),

            function CharactersController_getCharactersByUserId(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CharactersController();


              const promise = controller.getCharactersByUserId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/characters/:characterId',
            ...(fetchMiddlewares<RequestHandler>(CharactersController)),
            ...(fetchMiddlewares<RequestHandler>(CharactersController.prototype.getCharacterById)),

            function CharactersController_getCharacterById(request: any, response: any, next: any) {
            const args = {
                    characterId: {"in":"path","name":"characterId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CharactersController();


              const promise = controller.getCharacterById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/characters',
            ...(fetchMiddlewares<RequestHandler>(CharactersController)),
            ...(fetchMiddlewares<RequestHandler>(CharactersController.prototype.createCharacter)),

            function CharactersController_createCharacter(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CharacterCreateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CharactersController();


              const promise = controller.createCharacter.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/characters/:characterId',
            ...(fetchMiddlewares<RequestHandler>(CharactersController)),
            ...(fetchMiddlewares<RequestHandler>(CharactersController.prototype.updateCharacter)),

            function CharactersController_updateCharacter(request: any, response: any, next: any) {
            const args = {
                    characterId: {"in":"path","name":"characterId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"CharacterUpdateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CharactersController();


              const promise = controller.updateCharacter.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/characters/:characterId',
            ...(fetchMiddlewares<RequestHandler>(CharactersController)),
            ...(fetchMiddlewares<RequestHandler>(CharactersController.prototype.deleteCharacter)),

            function CharactersController_deleteCharacter(request: any, response: any, next: any) {
            const args = {
                    characterId: {"in":"path","name":"characterId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CharactersController();


              const promise = controller.deleteCharacter.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/elements',
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.getAllElements)),

            function ElementsController_getAllElements(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.getAllElements.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/elements/:elementId',
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.getElementById)),

            function ElementsController_getElementById(request: any, response: any, next: any) {
            const args = {
                    elementId: {"in":"path","name":"elementId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.getElementById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/elements',
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.createElement)),

            function ElementsController_createElement(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ElementCreateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.createElement.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/elements/:elementId',
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.updateElement)),

            function ElementsController_updateElement(request: any, response: any, next: any) {
            const args = {
                    elementId: {"in":"path","name":"elementId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ElementUpdateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.updateElement.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/elements/:elementId',
            ...(fetchMiddlewares<RequestHandler>(ElementsController)),
            ...(fetchMiddlewares<RequestHandler>(ElementsController.prototype.deleteElement)),

            function ElementsController_deleteElement(request: any, response: any, next: any) {
            const args = {
                    elementId: {"in":"path","name":"elementId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ElementsController();


              const promise = controller.deleteElement.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/jobs/:jobId',
            ...(fetchMiddlewares<RequestHandler>(JobsController)),
            ...(fetchMiddlewares<RequestHandler>(JobsController.prototype.getJobById)),

            function JobsController_getJobById(request: any, response: any, next: any) {
            const args = {
                    jobId: {"in":"path","name":"jobId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new JobsController();


              const promise = controller.getJobById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/jobs',
            ...(fetchMiddlewares<RequestHandler>(JobsController)),
            ...(fetchMiddlewares<RequestHandler>(JobsController.prototype.createJob)),

            function JobsController_createJob(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"Job"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new JobsController();


              const promise = controller.createJob.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/jobs/:jobId',
            ...(fetchMiddlewares<RequestHandler>(JobsController)),
            ...(fetchMiddlewares<RequestHandler>(JobsController.prototype.updateJob)),

            function JobsController_updateJob(request: any, response: any, next: any) {
            const args = {
                    jobId: {"in":"path","name":"jobId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"JobUpdateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new JobsController();


              const promise = controller.updateJob.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/jobs/:jobId',
            ...(fetchMiddlewares<RequestHandler>(JobsController)),
            ...(fetchMiddlewares<RequestHandler>(JobsController.prototype.deleteJob)),

            function JobsController_deleteJob(request: any, response: any, next: any) {
            const args = {
                    jobId: {"in":"path","name":"jobId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new JobsController();


              const promise = controller.deleteJob.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/locations/:locationId',
            ...(fetchMiddlewares<RequestHandler>(LocationsController)),
            ...(fetchMiddlewares<RequestHandler>(LocationsController.prototype.getLocationById)),

            function LocationsController_getLocationById(request: any, response: any, next: any) {
            const args = {
                    locationId: {"in":"path","name":"locationId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LocationsController();


              const promise = controller.getLocationById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/locations',
            ...(fetchMiddlewares<RequestHandler>(LocationsController)),
            ...(fetchMiddlewares<RequestHandler>(LocationsController.prototype.createLocation)),

            function LocationsController_createLocation(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"Location"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LocationsController();


              const promise = controller.createLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/locations/:locationId',
            ...(fetchMiddlewares<RequestHandler>(LocationsController)),
            ...(fetchMiddlewares<RequestHandler>(LocationsController.prototype.updateLocation)),

            function LocationsController_updateLocation(request: any, response: any, next: any) {
            const args = {
                    locationId: {"in":"path","name":"locationId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"LocationUpdateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LocationsController();


              const promise = controller.updateLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/locations/:locationId',
            ...(fetchMiddlewares<RequestHandler>(LocationsController)),
            ...(fetchMiddlewares<RequestHandler>(LocationsController.prototype.deleteLocation)),

            function LocationsController_deleteLocation(request: any, response: any, next: any) {
            const args = {
                    locationId: {"in":"path","name":"locationId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LocationsController();


              const promise = controller.deleteLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/npcs/:npcId',
            ...(fetchMiddlewares<RequestHandler>(NpcsController)),
            ...(fetchMiddlewares<RequestHandler>(NpcsController.prototype.getNpcById)),

            function NpcsController_getNpcById(request: any, response: any, next: any) {
            const args = {
                    npcId: {"in":"path","name":"npcId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NpcsController();


              const promise = controller.getNpcById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/npcs',
            ...(fetchMiddlewares<RequestHandler>(NpcsController)),
            ...(fetchMiddlewares<RequestHandler>(NpcsController.prototype.createNpc)),

            function NpcsController_createNpc(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"Npc"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NpcsController();


              const promise = controller.createNpc.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/npcs/:npcId',
            ...(fetchMiddlewares<RequestHandler>(NpcsController)),
            ...(fetchMiddlewares<RequestHandler>(NpcsController.prototype.updateNpc)),

            function NpcsController_updateNpc(request: any, response: any, next: any) {
            const args = {
                    npcId: {"in":"path","name":"npcId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"NpcUpdateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NpcsController();


              const promise = controller.updateNpc.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/npcs/:npcId',
            ...(fetchMiddlewares<RequestHandler>(NpcsController)),
            ...(fetchMiddlewares<RequestHandler>(NpcsController.prototype.deleteNpc)),

            function NpcsController_deleteNpc(request: any, response: any, next: any) {
            const args = {
                    npcId: {"in":"path","name":"npcId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NpcsController();


              const promise = controller.deleteNpc.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/users/:userId',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.getUserById)),

            function UsersController_getUserById(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UsersController();


              const promise = controller.getUserById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.createUser)),

            function UsersController_createUser(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"User"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UsersController();


              const promise = controller.createUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/users/:userId',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.updateUser)),

            function UsersController_updateUser(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"UserUpdateBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UsersController();


              const promise = controller.updateUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/users/:userId',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.deleteUser)),

            function UsersController_deleteUser(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UsersController();


              const promise = controller.deleteUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

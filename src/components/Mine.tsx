import React, { Component } from 'react'
import { IPoint } from '../../store/IPoint'

interface IMine {
    y_length: number,
    x_length: number,
    bombNum: number,
    bombMap: IPoint[][],
    over: boolean,
}
<?php

namespace App;

enum Role: string
{
    case Admin = 'admin';
    case Employee = 'employee';
    case Costumer = 'costumer';
}

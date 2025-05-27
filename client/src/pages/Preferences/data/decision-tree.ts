export type FinalResultNode = {
    finalResult: number;
};

export type ChoiceNode = {
    currentValue: number;
    A: ChoiceNode | FinalResultNode;
    B: ChoiceNode | FinalResultNode;
};

export const decisionTreeQuestion1: ChoiceNode = {
    currentValue: 160,
    A: {
        currentValue: 240,
        A: {
            currentValue: 280,
            A: {
                currentValue: 300,
                A: {
                    currentValue: 310,
                    A: {
                        finalResult: 32 // Will to take risks = 32
                    },
                    B: {
                        finalResult: 31 // Will to take risks = 31
                    }
                },
                B: {
                    currentValue: 290,
                    A: {
                        finalResult: 30 // Will to take risks = 30
                    },
                    B: {
                        finalResult: 29 // Will to take risks = 29
                    }
                }
            },
            B: {
                currentValue: 260,
                A: {
                    currentValue: 270,
                    A: {
                        finalResult: 28 // Will to take risks = 28
                    },
                    B: {
                        finalResult: 27 // Will to take risks = 27
                    }
                },
                B: {
                    currentValue: 250,
                    A: {
                        finalResult: 26 // Will to take risks = 26
                    },
                    B: {
                        finalResult: 25 // Will to take risks = 25
                    }
                }
            }
        },
        B: {
            currentValue: 200,
            A: {
                currentValue: 220,
                A: {
                    currentValue: 230,
                    A: {
                        finalResult: 24 // Will to take risks = 24
                    },
                    B: {
                        finalResult: 23 // Will to take risks = 23
                    }
                },
                B: {
                    currentValue: 210,
                    A: {
                        finalResult: 22 // Will to take risks = 22
                    },
                    B: {
                        finalResult: 21 // Will to take risks = 21
                    }
                }
            },
            B: {
                currentValue: 180,
                A: {
                    currentValue: 190,
                    A: {
                        finalResult: 20 // Will to take risks = 20
                    },
                    B: {
                        finalResult: 19 // Will to take risks = 19
                    }
                },
                B: {
                    currentValue: 170,
                    A: {
                        finalResult: 18 // Will to take risks = 18
                    },
                    B: {
                        finalResult: 17 // Will to take risks = 17
                    }
                }
            }
        }
    },
    B: {
        currentValue: 80,
        A: {
            currentValue: 120,
            A: {
                currentValue: 140,
                A: {
                    currentValue: 150,
                    A: {
                        finalResult: 16 // Will to take risks = 16
                    },
                    B: {
                        finalResult: 15 // Will to take risks = 15
                    }
                },
                B: {
                    currentValue: 130,
                    A: {
                        finalResult: 14 // Will to take risks = 14
                    },
                    B: {
                        finalResult: 13 // Will to take risks = 13
                    }
                }
            },
            B: {
                currentValue: 100,
                A: {
                    currentValue: 110,
                    A: {
                        finalResult: 12 // Will to take risks = 12
                    },
                    B: {
                        finalResult: 11 // Will to take risks = 11
                    }
                },
                B: {
                    currentValue: 90,
                    A: {
                        finalResult: 10 // Will to take risks = 10
                    },
                    B: {
                        finalResult: 9 // Will to take risks = 9
                    }
                }
            }
        },
        B: {
            currentValue: 40,
            A: {
                currentValue: 60,
                A: {
                    currentValue: 70,
                    A: {
                        finalResult: 8 // Will to take risks = 8
                    },
                    B: {
                        finalResult: 7 // Will to take risks = 7
                    }
                },
                B: {
                    currentValue: 50,
                    A: {
                        finalResult: 6 // Will to take risks = 6
                    },
                    B: {
                        finalResult: 5 // Will to take risks = 5
                    }
                }
            },
            B: {
                currentValue: 20,
                A: {
                    currentValue: 30,
                    A: {
                        finalResult: 4 // Will to take risks = 4
                    },
                    B: {
                        finalResult: 3 // Will to take risks = 3
                    }
                },
                B: {
                    currentValue: 10,
                    A: {
                        finalResult: 2 // Will to take risks = 2
                    },
                    B: {
                        finalResult: 1 // Will to take risks = 1
                    }
                }
            }
        }
    }
};

export const decisionTreeQuestion3: ChoiceNode = {
    currentValue: 154,
    A: {
        currentValue: 185,
        A: {
            currentValue: 202,
            A: {
                currentValue: 210,
                A: {
                    currentValue: 215,
                    A: {
                        finalResult: 1 // Patience = 1
                    },
                    B: {
                        finalResult: 2 // Patience = 2
                    }
                },
                B: {
                    currentValue: 206,
                    A: {
                        finalResult: 3 // Patience = 3
                    },
                    B: {
                        finalResult: 4 // Patience = 4
                    }
                }
            },
            B: {
                currentValue: 193,
                A: {
                    currentValue: 197,
                    A: {
                        finalResult: 5 // Patience = 5
                    },
                    B: {
                        finalResult: 6 // Patience = 6
                    }
                },
                B: {
                    currentValue: 189,
                    A: {
                        finalResult: 7 // Patience = 7
                    },
                    B: {
                        finalResult: 8 // Patience = 8
                    }
                }
            }
        },
        B: {
            currentValue: 169,
            A: {
                currentValue: 177,
                A: {
                    currentValue: 181,
                    A: {
                        finalResult: 9 // Patience = 9
                    },
                    B: {
                        finalResult: 10 // Patience = 10
                    }
                },
                B: {
                    currentValue: 173,
                    A: {
                        finalResult: 11 // Patience = 11
                    },
                    B: {
                        finalResult: 12 // Patience = 12
                    }
                }
            },
            B: {
                currentValue: 161,
                A: {
                    currentValue: 165,
                    A: {
                        finalResult: 13 // Patience = 13
                    },
                    B: {
                        finalResult: 14 // Patience = 14
                    }
                },
                B: {
                    currentValue: 158,
                    A: {
                        finalResult: 15 // Patience = 15
                    },
                    B: {
                        finalResult: 16 // Patience = 16
                    }
                }
            }
        }
    },
    // ---------------------------------
    B: {
        currentValue: 125,
        A: {
            currentValue: 139,
            A: {
                currentValue: 146,
                A: {
                    currentValue: 150,
                    A: {
                        finalResult: 17 // Patience = 17
                    },
                    B: {
                        finalResult: 18 // Patience = 18
                    }
                },
                B: {
                    currentValue: 143,
                    A: {
                        finalResult: 19 // Patience = 19
                    },
                    B: {
                        finalResult: 20 // Patience = 20
                    }
                }
            },
            B: {
                currentValue: 132,
                A: {
                    currentValue: 136,
                    A: {
                        finalResult: 21 // Patience = 21
                    },
                    B: {
                        finalResult: 22 // Patience = 22
                    }
                },
                B: {
                    currentValue: 129,
                    A: {
                        finalResult: 23 // Patience = 23
                    },
                    B: {
                        finalResult: 24 // Patience = 24
                    }
                }
            }
        },
        B: {
            currentValue: 112,
            A: {
                currentValue: 119,
                A: {
                    currentValue: 122,
                    A: {
                        finalResult: 25 // Patience = 25
                    },
                    B: {
                        finalResult: 26 // Patience = 26
                    }
                },
                B: {
                    currentValue: 116,
                    A: {
                        finalResult: 27 // Patience = 27
                    },
                    B: {
                        finalResult: 28 // Patience = 28
                    }
                }
            },
            B: {
                currentValue: 106,
                A: {
                    currentValue: 109,
                    A: {
                        finalResult: 29 // Patience = 29
                    },
                    B: {
                        finalResult: 30 // Patience = 30
                    }
                },
                B: {
                    currentValue: 103,
                    A: {
                        finalResult: 31 // Patience = 31
                    },
                    B: {
                        finalResult: 32 // Patience = 32
                    }
                }
            }
        }
    }
};

"use client"

import { useState, useEffect } from "react"
import { ChefHat, Utensils, Coffee, Cookie } from "lucide-react"

interface LoadingScreenProps {
  onComplete: () => void
}

const cookingTips = [
  "Always preheat your pan before adding ingredients for even cooking.",
  "To keep herbs fresh longer, store them in a glass of water in the fridge.",
  "Add a pinch of salt when boiling water—it helps it boil faster!",
  "Don't overcrowd the pan when frying—it lowers the temperature and makes food soggy.",
  "Use a damp paper towel under your cutting board to prevent slipping.",
  "Store onions and potatoes separately to prevent spoilage.",
  "Add a slice of bread to your brown sugar container to keep it soft.",
  "Rinse rice until the water runs clear for fluffier grains.",
  "Freeze leftover herbs in olive oil to use later in cooking.",
  "A squeeze of lemon can enhance the flavor of almost any dish.",
]

const loadingIcons = [ChefHat, Utensils, Coffee, Cookie]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [randomTip, setRandomTip] = useState("")
  const [currentIcon, setCurrentIcon] = useState(0)

  useEffect(() => {
    setRandomTip(cookingTips[Math.floor(Math.random() * cookingTips.length)])

    // Icon rotation
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % loadingIcons.length)
    }, 500)

    return () => clearInterval(iconInterval)
  }, [])

  useEffect(() => {
    const steps = [
      { delay: 1000, step: 1 },
      { delay: 2000, step: 2 },
      { delay: 3500, step: 3 },
    ]

    const timeouts = steps.map(({ delay, step }) => setTimeout(() => setCurrentStep(step), delay))

    const completeTimeout = setTimeout(() => {
      onComplete()
    }, 5000)

    return () => {
      timeouts.forEach(clearTimeout)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  const CurrentIcon = loadingIcons[currentIcon]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl px-4">
        <div className="relative">
          <div className="animate-bounce">
            <CurrentIcon className="w-24 h-24 text-orange-500 mx-auto mb-4" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping"></div>
        </div>

        {currentStep >= 1 && (
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              GlobalKitchen
            </h1>
          </div>
        )}

        {currentStep >= 2 && (
          <div className="animate-fade-in">
            <p className="text-2xl md:text-3xl text-purple-200 font-medium mb-8">
              Cooking Without Borders where Flavors Meet Cultures
            </p>
            <div className="flex justify-center space-x-4 text-white/60">
              <span className="flex items-center space-x-2">
                <ChefHat className="w-5 h-5" />
                <span>Share Recipes</span>
              </span>
              <span className="flex items-center space-x-2">
                <Utensils className="w-5 h-5" />
                <span>Connect Chefs</span>
              </span>
              <span className="flex items-center space-x-2">
                <Coffee className="w-5 h-5" />
                <span>Discover Flavors</span>
              </span>
            </div>
          </div>
        )}

        {currentStep >= 3 && (
          <div className="animate-fade-in">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-orange-400 mb-3 flex items-center justify-center">
                <Cookie className="w-5 h-5 mr-2" />💡 Chef's Tip of the Day
              </h3>
              <p className="text-white text-lg leading-relaxed">{randomTip}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= currentStep ? "bg-orange-500" : "bg-white/20"
                } transition-colors duration-300`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

require 'json'

class MainController < ApplicationController
  def index
    @all_walks = Walk.all
  end

  def finish_walk
    Walk.find(params[:id]).finish_it(params[:time])
    redirect_to action: 'index'
  end

  def add_count_walk
    origin = params[:origin]
    destination = params[:destination]
    start = params[:start]
    finish = params.key?(:finish) ? params[:finish] : nil

    Walk.new(origin: origin, destination: destination, time_start: start, time_finish: finish).save
    redirect_to action: 'index'
  end

  proc {
    def add_and_count
      origin = params[:origin]
      destination = params[:destination]
      start = params[:start]

      Walk.new(origin: origin, destination: destination, time_start: start).save
      redirect_to action: 'index'
    end
  }
end

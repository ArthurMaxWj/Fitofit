require 'geocoder'

require 'date'

class Walk < ApplicationRecord
  # methods extracting essential info and formatting functions:

  def distance
    Geocoder::Calculations.distance_between(origin, destination, { units: :km }).round(2)
  end

  def distance_str
    "#{distance}km"
  end

  def duration_str
    non_zero = ->(num){ num.negative? ? 0 : num }
    fill = ->(num){ num.negative? ? "0#{non_zero.call(num)}" : non_zero.call(num) }

    tf = Time.at(time_finish)
    ts = Time.at(time_start)

    sec_diff = (tf.sec-ts.sec).abs
    min_diff = (tf.min-ts.min - (sec_diff.negative? ? 1 : 0)).abs
    hour_diff = (tf.hour-ts.hour - (min_diff.negative? ? 1 : 0)).abs

    "#{hour_diff.to_s + 'h '.to_s if hour_diff.positive?}#{fill.call(min_diff)}:#{fill.call(sec_diff)}"
  end

  # methods dealing with unfnished walks, useful when immplementation changes:

  def finished?
    !time_finish.nil?
  end

  def finish_it(ftime)
    update(time_finish: ftime)
  end
end

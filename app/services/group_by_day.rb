class GroupByDay
  def self.call(walks)
    GroupByDay.new.call(walks)
  end

  def call(walks)
    hash = {}
    walks.each do |walk|
      no_time = witchout_time(walk.time_start).to_s

      hash[no_time] = [] unless hash.key?(no_time)
      hash[no_time] << walk
    end

    hash.sort.reverse!
  end

  private

  def witchout_time(date_time)
    date_time /= 24 * 60 * 60
    date_time.floor
  end
end

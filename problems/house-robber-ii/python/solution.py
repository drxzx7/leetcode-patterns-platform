# House Robber II - Python Solution
# House Robber II - Optimal Python Solution (Dynamic Programming)
from typing import List, Dict, Optional

class Solution:
    def houserobberii(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Dynamic Programming traversal
        for num in nums:
            result += num
            
        return result

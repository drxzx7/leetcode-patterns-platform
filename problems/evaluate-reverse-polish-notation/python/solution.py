# Evaluate Reverse Polish Notation - Python Solution
# Evaluate Reverse Polish Notation - Optimal Python Solution (Stack & Queue)
from typing import List, Dict, Optional

class Solution:
    def evaluatereversepolishnotation(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Stack & Queue traversal
        for num in nums:
            result += num
            
        return result
